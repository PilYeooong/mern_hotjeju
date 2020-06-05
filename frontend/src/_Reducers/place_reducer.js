import {
  ADD_PLACE_REQUEST,
  ADD_PLACE_SUCCESS,
  LOAD_MAIN_PLACES_REQUEST,
  LOAD_MAIN_PLACES_SUCCESS,
  LOAD_MAIN_PLACES_FAILURE,
  LOAD_CATEGORIZED_PLACES_REQUEST,
  LOAD_CATEGORIZED_PLACES_SUCCESS,
  LOAD_CATEGORIZED_PLACES_FAILURE,
  LOAD_PLACE_DETAIL_REQUEST,
  LOAD_PLACE_DETAIL_SUCCESS,
  LOAD_PLACE_DETAIL_FAILURE,
} from "../_Actions/types";

const initialState = {
  places: [],
  isAddingPost: false,
  placeDetail: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_CATEGORIZED_PLACES_REQUEST:
    case LOAD_MAIN_PLACES_REQUEST: {
      return {
        ...state,
        places: [],
      };
    }
    case LOAD_CATEGORIZED_PLACES_SUCCESS:
    case LOAD_MAIN_PLACES_SUCCESS: {
      return {
        ...state,
        places: action.data,
        placeDetail: null,
      };
    }
    case LOAD_CATEGORIZED_PLACES_FAILURE:
    case LOAD_MAIN_PLACES_FAILURE: {
      return {
        ...state,
        places: [],
      };
    }
    case ADD_PLACE_REQUEST: {
      return {
        ...state,
        isAddingPost: true,
      };
    }
    case ADD_PLACE_SUCCESS: {
      return {
        ...state,
        isAddingPost: false,
        places: [action.data, ...state.places],
      };
    }
    case LOAD_PLACE_DETAIL_REQUEST: {
      return {
        ...state,
        placeDetail: null,
      }
    }
    case LOAD_PLACE_DETAIL_SUCCESS: {
      return {
        ...state,
        placeDetail: action.data
      }
    }
    case LOAD_PLACE_DETAIL_FAILURE: {
      return {
        ...state,
        placeDetail: null,
      }
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
