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
    CREATE_TEAM_REQUEST,
    CREATE_TEAM_SUCCESS,
    CREATE_TEAM_FAIL,
    JOIN_TEAM_REQUEST,
    JOIN_TEAM_SUCCESS,
    JOIN_TEAM_FAIL,
    TEAM_REQUEST,
    TEAM_SUCCESS,
    TEAM_FAIL,
    RELOAD,

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
            "/auth/login",
            { email, password },
            config
        );
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data.data,
        });

        localStorage.setItem("userData", JSON.stringify(data.data));
        dispatch({
            type: TOAST_ADD,
            payload: 'LOGINED SUCCESSFULLY !!!',
        });
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.msg
                    ? error.response.data.msg
                    : error.msg,
        });
    }
};

//for logout

export const logout = () => async (dispatch, getState) => {

 
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
                payload: data.data,
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
                    error.response && error.response.data.msg
                        ? error.response.data.msg
                        : error.msg,
            });
        }
    };


// add Team

export const addTeam =
    (userId,name) => async (dispatch) => {
        try {
            dispatch({
                type: CREATE_TEAM_REQUEST,
            });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                },
            };

            const { data } = await client.post(
                `/team/${userId}`,
                { name },
                config
            );

            dispatch({
                type: CREATE_TEAM_SUCCESS,
                payload: data.data,
            });
            dispatch({
                type: TOAST_ADD,
                payload: 'TEAM CREATED SUCCESSFULLY !!!',
            });
            dispatch({
                type: RELOAD
            })
        } catch (error) {
            dispatch({
                type: CREATE_TEAM_FAIL,
                payload:
                    error.response && error.response.data.msg
                        ? error.response.data.msg
                        : error.msg,
            });
            dispatch({
                type: TOAST_ADD,
                payload: error.response && error.response.data.msg
                    ? error.response.data.msg
                    : error.msg,
            });
        }
    };

// join Team
export const joinTeam =
    (userId,teamCode) => async (dispatch) => {
        try {
            dispatch({
                type: JOIN_TEAM_REQUEST,
            });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                },
            };

            const { data } = await client.post(
                `/team/usr/${userId}`,
                { teamCode },
                config
            );

            dispatch({
                type: JOIN_TEAM_SUCCESS,
                payload: data.data,
            });
            dispatch({
                type: TOAST_ADD,
                payload: 'TEAM JOINED SUCCESSFULLY !!!',
            });
            dispatch({
                type: RELOAD
            })
        } catch (error) {
            dispatch({
                type: JOIN_TEAM_FAIL,
                payload:
                    error.response && error.response.data.msg
                        ? error.response.data.msg
                        : error.msg,
            });
            dispatch({
                type: TOAST_ADD,
                payload: error.response && error.response.data.msg
                    ? error.response.data.msg
                    : error.msg ,
            });
        }
    };

// get All Teams

export const getAllTeam = (userId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TEAM_REQUEST,
        });
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            },
        };

        const { data } = await client.get(`/team/usr/${userId}`, config);

        dispatch({
            type: TEAM_SUCCESS,
            payload: data.teams,
        });
    } catch (error) {
        const msg =
            error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg;
        dispatch({
            type: TEAM_FAIL,
            payload: msg,
        });
    }
};

// add user in team

export const addUser =
    (teamId, email) => async (dispatch) => {
        try {
            dispatch({
                type: CREATE_TEAM_REQUEST,
            });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                },
            };

            const { data } = await client.post(
                `/team/admin/${teamId}`,
                { email },
                config
            );
            dispatch({
                type: TOAST_ADD,
                payload: 'USER ADDED !!!',
            });
            dispatch({
                type: RELOAD
            })
        } catch (error) {
         
            dispatch({
                type: TOAST_ADD,
                payload: error.response && error.response.data.msg
                    ? error.response.data.msg
                    : error.msg,
            });
         
        }
    };

// add channel

export const addChannel =
    (teamId, name) => async (dispatch) => {
        try {
            // dispatch({
            //     type: CREATE_TEAM_REQUEST,
            // });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                },
            };

            const { data } = await client.post(
                `/channel/${teamId}`,
                { name },
                config
            );
            dispatch({
                type: TOAST_ADD,
                payload: 'Channel ADDED !!!',
            });
            dispatch({
                type: RELOAD
            })
        } catch (error) {

            dispatch({
                type: TOAST_ADD,
                payload: error.response && error.response.data.msg
                    ? error.response.data.msg
                    : error.msg,
            });
            
        }
    };