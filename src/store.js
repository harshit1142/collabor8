import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TeamReducer, createTeamReducer, joinTeamReducer, toastMessage, userLoginReducer, userRegisterReducer } from "./reducers/userReducer";
import {
    getMESSAGE,
    postMESSAGE
} from './reducers/messageReducer'
const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    toastMessage: toastMessage,
    createTeam:createTeamReducer,
    joinTeam:joinTeamReducer,
    getTeam:TeamReducer,
    getMessage: getMESSAGE,
    postMESSAGE: postMESSAGE,
})
const userDataFromStorage = localStorage.getItem('userData')
    ? JSON.parse(localStorage.getItem('userData'))
    : null

// const middleware = [thunk]
const initialState = {
    userLogin: { userData: userDataFromStorage },
}

const store = configureStore({
    reducer,
    initialState
})
export default store