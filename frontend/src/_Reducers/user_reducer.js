import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, AUTH_USER } from "../_Actions/types";

export default function(state={}, action){
  switch(action.type){
    case REGISTER_USER:
        return {...state, register: action.payload }
    case LOGIN_USER:
        return { ...state, ...action.payload }
    case AUTH_USER:
        return {...state, userData: action.payload }
    case LOGOUT_USER:
        return { ...state, userData: action.payload }
    default:
        return state;
}
}