import produce from "immer";

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
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LOAD_MORE_COMMENTS_SUCCESS,
  TOGGLE_LIKE_REQUEST,
  TOGGLE_LIKE_SUCCESS,
  TOGGLE_LIKE_FAILURE,
  TOGGLE_WISH_REQUEST,
  TOGGLE_WISH_SUCCESS,
  TOGGLE_WISH_FAILURE,
  SEARCH_PLACE_REQUEST,
  SEARCH_PLACE_SUCCESS,
  SEARCH_PLACE_FAILURE,
  SORT_BY_LIKES,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  EDIT_PLACE_REQUEST,
  EDIT_PLACE_SUCCESS,
  EDIT_PLACE_FAILURE,
  REMOVE_IMAGE,
  SEARCH_HASHTAG_REQUEST,
  SEARCH_HASHTAG_SUCCESS,
  SEARCH_HASHTAG_FAILURE,
} from "../_Actions/types";

const initialState = {
  places: [],
  isAddingPost: false,
  isEditingPost: false,
  placeDetail: {
    Comments: [],
    hasMoreComments: false,
  },
};

export default function (state = initialState, action) {
  return produce(state, (draft) => {
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
      case SORT_BY_LIKES: {
        const sortedPlace = draft.places.sort(function (one, other) {
          return other.likers.length - one.likers.length;
        });
        draft.places = sortedPlace;
        break;
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
        };
      }
      case LOAD_PLACE_DETAIL_SUCCESS: {
        return {
          ...state,
          placeDetail: {
            ...action.data.place,
            creator: action.data.place.creator._id,
            isLiked: action.data.isLiked,
            isWished: action.data.isWished,
          },
        };
      }
      case LOAD_PLACE_DETAIL_FAILURE: {
        return {
          ...state,
          placeDetail: null,
        };
      }
      case SEARCH_PLACE_REQUEST: {
        break;
      }
      case SEARCH_PLACE_SUCCESS: {
        draft.places = action.data;
        draft.placeDetail = null;
        break;
      }
      case SEARCH_PLACE_FAILURE: {
        break;
      }
      case SEARCH_HASHTAG_REQUEST: {
        break;
      }
      case SEARCH_HASHTAG_SUCCESS: {
        draft.places = action.data;
        draft.placeDetail = null;
        break;
      }
      case SEARCH_HASHTAG_FAILURE: {
        break;
      }
      case ADD_COMMENT_REQUEST: {
        return {
          ...state,
        };
      }
      case ADD_COMMENT_SUCCESS: {
        return {
          ...state,
          placeDetail: {
            ...state.placeDetail,
            Comments: [action.data, ...state.placeDetail.Comments],
          },
        };
      }
      case ADD_COMMENT_FAILURE: {
        return {
          ...state,
        };
      }
      case LOAD_COMMENTS_REQUEST: {
        return {
          ...state,
          // placeDetail: {
          //   ...state.placeDetail,
          //   Comments: !action.offset ? [] : state.placeDetail.Comments,
          // },
        };
      }
      case LOAD_COMMENTS_SUCCESS: {
        return {
          ...state,
          placeDetail: {
            ...state.placeDetail,
            Comments: action.data,
            hasMoreComments: action.data.length === 5,
          },
        };
      }
      case LOAD_MORE_COMMENTS_SUCCESS: {
        return {
          ...state,
          placeDetail: {
            ...state.placeDetail,
            Comments: state.placeDetail.Comments.concat(action.data),
            hasMoreComments: action.data.length === 5,
          },
        };
      }
      case LOAD_COMMENTS_FAILURE: {
        return {
          ...state,
        };
      }
      case TOGGLE_LIKE_REQUEST: {
        break;
      }
      case TOGGLE_LIKE_SUCCESS: {
        draft.placeDetail.isLiked = action.data;
        break;
      }
      case TOGGLE_LIKE_FAILURE: {
        break;
      }
      case TOGGLE_WISH_REQUEST: {
        break;
      }
      case TOGGLE_WISH_SUCCESS: {
        draft.placeDetail.isWished = action.data.wishResult;
        break;
      }
      case TOGGLE_WISH_FAILURE: {
        break;
      }
      case UPLOAD_IMAGES_REQUEST: {
        break;
      }
      case UPLOAD_IMAGES_SUCCESS: {
        action.data.forEach((p) => {
          draft.placeDetail.images.push(p);
        });
        break;
      }
      case UPLOAD_IMAGES_FAILURE: {
        break;
      }
      case EDIT_PLACE_REQUEST: {
        draft.isEditingPost = true;
        break;
      }
      case EDIT_PLACE_SUCCESS: {
        draft.placeDetail = action.data;
        draft.isEditingPost = false;
        break;
      }
      case EDIT_PLACE_FAILURE: {
        draft.isEditingPost = false;
        break;
      }
      case REMOVE_IMAGE: {
        const index = draft.placeDetail.images.findIndex(
          (v, i) => i == action.index
        );
        draft.placeDetail.images.splice(index, 1);
        break;
      }
      default: {
        return {
          ...state,
        };
      }
    }
  });
}
