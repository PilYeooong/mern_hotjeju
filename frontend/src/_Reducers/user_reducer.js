import produce from "immer";

import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  AUTH_USER,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  TOGGLE_WISH_SUCCESS,
  REMOVE_PLACE_REQUEST,
  REMOVE_PLACE_SUCCESS,
  REMOVE_PLACE_FAILURE,
} from "../_Actions/types";

export default function (state = {}, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case REGISTER_USER:
        return { ...state, register: action.payload };
      case LOGIN_USER:
        return { ...state, ...action.payload };
      case AUTH_USER:
        return { ...state, userData: action.payload };
      case LOGOUT_USER:
        return { ...state, userData: action.payload };
      case LOAD_USER_REQUEST: {
        return {
          ...state,
        };
      }
      case LOAD_USER_SUCCESS: {
        return {
          ...state,
          userInfo: action.data,
        };
      }
      case LOAD_USER_FAILURE: {
        return {
          ...state,
        };
      }
      case REMOVE_PLACE_REQUEST: {
        break;
      }
      case REMOVE_PLACE_SUCCESS: {
        const index = draft.userInfo.places.findIndex(
          (v, i) => v._id === action.data._id
        );
        const wishListIndex = draft.userInfo.wishList.findIndex(
          (v, i) => v._id === action.data._id
        );
        if(wishListIndex !== -1){
          draft.userInfo.wishList.splice(wishListIndex, 1);
        }
        draft.userInfo.places.splice(index, 1);
        break;
      }
      case REMOVE_PLACE_FAILURE: {
        break;
      }
      case TOGGLE_WISH_SUCCESS: {
        if (action.data.placeId) {
          const index = draft.userInfo.wishList.findIndex(
            (v) => v._id === action.data.placeId
          );
          draft.userInfo.wishList.splice(index, 1);
          break;
        }
      }
      default:
        return {
          ...state,
        };
    }
  });
}
