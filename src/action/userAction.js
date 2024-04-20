import { client } from "..";

import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_RESET,
    TOAST_ADD,

} from "../types/userConstants";

export const login = (email, password) => async (dispatch) => {
    try {

        if (localStorage.getItem("userData")) {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: JSON.parse(localStorage.getItem("userData")),
            });
            return;
        }
        dispatch({
            type: USER_LOGIN_REQUEST,
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            },
        };
        const { data } = await client.post(
            "/api/users/login",
            { email, password },
            config
        );
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data.data.user,
        });

        localStorage.setItem("userData", JSON.stringify(data.data.user));
        dispatch({
            type: TOAST_ADD,
            payload: 'LOGINED SUCCESSFULLY !!!',
        });
    } catch (error) {
        const errorMessage = (error.response.data);
        const parser = new DOMParser();
        const doc = parser.parseFromString(errorMessage, 'text/html');
        const errorText = doc.body.textContent.trim(); // Extracting text content and removing leading/trailing whitespace

        const message = errorText.split("at")[0];

        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data
                    ? message
                    : error.message,
        });
    }
};

//for logout

export const logout = () => async (dispatch, getState) => {
    const {
        userLogin: { userData },
    } = getState();
    console.log(userData);
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            Authorization: `Bearer ${userData.token}`,
        },
    };
    await client.post("/api/users/logout", {}, config);
    localStorage.removeItem("userData");
    dispatch({
        type: TOAST_ADD,
        payload: 'LOGOUT SUCCESSFULLY !!!',
    });
    dispatch({
        type: USER_LOGOUT,
    });
    dispatch({
        type: USER_REGISTER_RESET,
    });


};


export const register =
    (email, password, contact, name) => async (dispatch) => {
        try {
            dispatch({
                type: USER_REGISTER_REQUEST,
            });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                },
            };

            const { data } = await client.post(
                "/auth/register",
                { name, email, password, contact },
                config
            );

            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: data,
            });
            console.log(data);
            localStorage.setItem("userData", JSON.stringify(data.data));
            dispatch({
                type: TOAST_ADD,
                payload: 'REGISTERED SUCCESSFULLY !!!',
            });
        } catch (error) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };



