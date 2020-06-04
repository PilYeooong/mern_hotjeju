import { ADD_PLACE_REQUEST, ADD_PLACE_SUCCESS, LOAD_MAIN_PLACES_REQUEST, LOAD_MAIN_PLACES_SUCCESS, LOAD_MAIN_PLACES_FAILURE } from "../_Actions/types"

const initialState = {
  places : [],
  isAddingPost: false,
}

export default function(state=initialState, action){
  switch(action.type){
    case LOAD_MAIN_PLACES_REQUEST: {
      return {
        ...state,
        places: []
      }
    }
    case LOAD_MAIN_PLACES_SUCCESS: {
      return {
        ...state,
        places: action.data
      }
    }
    case LOAD_MAIN_PLACES_FAILURE: {
      return {
        ...state,
        places: []
      }
    }
    case ADD_PLACE_REQUEST : {
      return {
        ...state,
        isAddingPost: true,
      }
    }
    case ADD_PLACE_SUCCESS: {
      return {
        ...state,
        isAddingPost: false,
        places: [action.data, ...state.places]
      }
    }
    default : {
      return {
        ...state,
      }
    }
  }
}