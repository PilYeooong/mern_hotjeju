import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, AUTH_USER, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE } from "../_Actions/types";

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
    case LOAD_USER_REQUEST: {
      return {
        ...state,
      }
    }
    case LOAD_USER_SUCCESS : {
      return {
        ...state,
        userInfo: action.data,
      }
    }
    case LOAD_USER_FAILURE : {
      return {
        ...state,
      }
    }
    default:
        return state;
}
}