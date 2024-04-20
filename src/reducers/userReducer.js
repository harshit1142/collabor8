import {
    TOAST_ADD,
    TOAST_RESET,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_RESET,
    USER_REGISTER_SUCCESS,
} from '../types/userConstants'

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true,
            }

        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userData: action.payload,
            }
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}


export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                loading: true,
            }

        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                userData: action.payload,
            }
        case USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case USER_REGISTER_RESET:
            return {}

        default:
            return state
    }
}

// Toast Message

export const toastMessage = (state = '', action) => {
    switch (action.type) {
        case TOAST_ADD:
            return {
                message: action.payload,
            }
        case TOAST_RESET:
            return null
        default:
            return state
    }
}