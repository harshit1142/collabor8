import {
    MESSAGE_FAIL,
    MESSAGE_REQUEST,
    MESSAGE_SUCCESS,
    MESSAGE_SEND_FAIL,
    MESSAGE_SEND_REQUEST,
    MESSAGE_SEND_SUCCESS,
    MESSAGE_RESET,
    MESSAGE_SEND_RESET
} from '../types/messageConstants'

export const getMESSAGE = (state = {}, action) => {
    switch (action.type) {
        case MESSAGE_REQUEST:
            return {
                loading: true,
            }

        case MESSAGE_SUCCESS:
            return {
                loading: false,
                messageData: action.payload,
            }
        case MESSAGE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
            case MESSAGE_RESET:
                return {}
        default:
            return state
    }
}

export const postMESSAGE = (state = {}, action) => {
    switch (action.type) {
        case MESSAGE_SEND_REQUEST:
            return {
                loading: true,
            }

        case MESSAGE_SEND_SUCCESS:
            return {
                loading: false,
                postMessage: action.payload,
            }
        case MESSAGE_SEND_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
            case MESSAGE_SEND_RESET:
                return {}
        default:
            return state
    }
}

