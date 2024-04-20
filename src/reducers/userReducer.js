import {
    CREATE_TEAM_FAIL,
    CREATE_TEAM_REQUEST,
    CREATE_TEAM_RESET,
    CREATE_TEAM_SUCCESS,
    JOIN_TEAM_FAIL,
    JOIN_TEAM_REQUEST,
    JOIN_TEAM_RESET,
    JOIN_TEAM_SUCCESS,
    TEAM_FAIL,
    TEAM_REQUEST,
    TEAM_RESET,
    TEAM_SUCCESS,
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
export const createTeamReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_TEAM_REQUEST:
            return {
                loading: true,
            }

        case CREATE_TEAM_SUCCESS:
            return {
                loading: false,
                createTeam: action.payload,
            }
        case CREATE_TEAM_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CREATE_TEAM_RESET:
            return {}

        default:
            return state
    }
}
export const joinTeamReducer = (state = {}, action) => {
    switch (action.type) {
        case JOIN_TEAM_REQUEST:
            return {
                loading: true,
            }

        case JOIN_TEAM_SUCCESS:
            return {
                loading: false,
                joinTeam: action.payload,
            }
        case JOIN_TEAM_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case JOIN_TEAM_RESET:
            return {}

        default:
            return state
    }
}

export const TeamReducer = (state = {}, action) => {
    switch (action.type) {
        case TEAM_REQUEST:
            return {
                loading: true,
            }

        case TEAM_SUCCESS:
            return {
                loading: false,
                team: action.payload,
            }
        case TEAM_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case TEAM_RESET:
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