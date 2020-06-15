import {
  LOAD_IMAGES_REQUEST,
  LOAD_IMAGES_SUCCESS,
  LOAD_IMAGES_FAILURE,
} from "../_Actions/types";

const initialState = {
  images: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_IMAGES_REQUEST: {
      return {
        ...state,
      };
    }
    case LOAD_IMAGES_SUCCESS: {
      return {
        ...state,
        images: action.data,
      };
    }
    case LOAD_IMAGES_FAILURE: {
      return {
        ...state,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
