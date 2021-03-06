import { all, fork, takeLatest, call, put } from "redux-saga/effects";

import {
  ADD_PLACE_REQUEST,
  ADD_PLACE_SUCCESS,
  ADD_PLACE_FAILURE,
  LOAD_MAIN_PLACES_REQUEST,
  LOAD_MAIN_PLACES_FAILURE,
  LOAD_MAIN_PLACES_SUCCESS,
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
  TOGGLE_LIKE_SUCCESS,
  TOGGLE_LIKE_FAILURE,
  TOGGLE_LIKE_REQUEST,
  LOAD_MORE_COMMENTS_SUCCESS,
  SEARCH_PLACE_REQUEST,
  SEARCH_PLACE_SUCCESS,
  SEARCH_PLACE_FAILURE,
  TOGGLE_WISH_REQUEST,
  TOGGLE_WISH_SUCCESS,
  TOGGLE_WISH_FAILURE,
  EDIT_PLACE_FAILURE,
  EDIT_PLACE_SUCCESS,
  EDIT_PLACE_REQUEST,
  REMOVE_PLACE_REQUEST,
  REMOVE_PLACE_SUCCESS,
  REMOVE_PLACE_FAILURE,
  SEARCH_HASHTAG_REQUEST,
  SEARCH_HASHTAG_SUCCESS,
  SEARCH_HASHTAG_FAILURE,
} from "../_Actions/types";
import Axios from "axios";

Axios.defaults.baseURL = "http://localhost:3000/api/";
function loadPlacesAPI() {
  return Axios.get("/places");
}

function* loadPlaces() {
  try {
    const result = yield call(loadPlacesAPI);
    yield put({
      type: LOAD_MAIN_PLACES_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_MAIN_PLACES_FAILURE,
      error: e,
    });
  }
}

function* watchLoadPlaces() {
  yield takeLatest(LOAD_MAIN_PLACES_REQUEST, loadPlaces);
}

// -----------------------------------------------------------------------

function categorizedPlaceAPI(category) {
  return Axios.post(`/places/${category}/`);
}

function* categorizedPlace(action) {
  try {
    const result = yield call(categorizedPlaceAPI, action.data);
    yield put({
      type: LOAD_CATEGORIZED_PLACES_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_CATEGORIZED_PLACES_FAILURE,
      error: e,
    });
  }
}

function* watchCategorizedPlace() {
  yield takeLatest(LOAD_CATEGORIZED_PLACES_REQUEST, categorizedPlace);
}
// -----------------------------------------------------------------------

function addPlaceAPI(placeData) {
  return Axios.post("/places/new/", placeData);
}

function* addPlace(action) {
  try {
    const result = yield call(addPlaceAPI, action.data);
    yield put({
      type: ADD_PLACE_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: ADD_PLACE_FAILURE,
      error: e,
    });
  }
}

function* watchAddPlace() {
  yield takeLatest(ADD_PLACE_REQUEST, addPlace);
}

// -----------------------------------------------------------------------

function loadCommentsAPI(placeId, offset = 0) {
  return Axios.get(`/places/${placeId}/comments?offset=${offset}`);
}

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsAPI, action.data, action.offset);
    console.log(result);
    yield put({
      // type: LOAD_COMMENTS_SUCCESS,
      type: LOAD_MORE_COMMENTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_COMMENTS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadComments() {
  yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments);
}

// -----------------------------------------------------------------------

function loadPlaceDetailAPI(placeId) {
  return Axios.get(`/places/${placeId}/`);
}

function* loadPlaceDetail(action) {
  try {
    const result = yield call(loadPlaceDetailAPI, action.data);
    const comments = yield call(loadCommentsAPI, action.data);
    yield put({
      type: LOAD_PLACE_DETAIL_SUCCESS,
      data: result.data,
    });
    yield put({
      type: LOAD_COMMENTS_SUCCESS,
      data: comments.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_PLACE_DETAIL_FAILURE,
      error: e,
    });
  }
}

function* watchLoadPlaceDetail() {
  yield takeLatest(LOAD_PLACE_DETAIL_REQUEST, loadPlaceDetail);
}

// -----------------------------------------------------------------------

function addCommentAPI(data) {
  return Axios.post(`/places/${data.placeId}/comment`, { text: data.comment });
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e,
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

// -----------------------------------------------------------------------

function toggleLikeAPI(data) {
  return Axios.post(`/places/${data.placeId}/togglelike`, {
    isLiked: data.isLiked,
  });
}

function* toggleLike(action) {
  try {
    const result = yield call(toggleLikeAPI, action.data);
    yield put({
      type: TOGGLE_LIKE_SUCCESS,
      data: result.data.likeResult,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: TOGGLE_LIKE_FAILURE,
      error: e,
    });
  }
}

function* watchToggleLike() {
  yield takeLatest(TOGGLE_LIKE_REQUEST, toggleLike);
}

// -----------------------------------------------------------------------

function searchPlaceAPI(place) {
  return Axios.get(`/search/${place}/`);
}

function* searchPlace(action) {
  try {
    const result = yield call(searchPlaceAPI, action.data);
    console.log(result);
    yield put({
      type: SEARCH_PLACE_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SEARCH_PLACE_FAILURE,
      error: e,
    });
  }
}

function* watchSearchPlace() {
  yield takeLatest(SEARCH_PLACE_REQUEST, searchPlace);
}

// -----------------------------------------------------------------------

function searchHashtagAPI(tag) {
  return Axios.get(`/hashtag/${tag}/`);
}

function* searchHashtag(action) {
  try {
    const result = yield call(searchHashtagAPI, action.data);
    console.log(result.data);
    yield put({
      type: SEARCH_HASHTAG_SUCCESS,
      data: result.data.length !== 0 ? result.data[0].places : []
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SEARCH_HASHTAG_FAILURE,
      error: e,
    });
  }
}

function* watchSearchHashtag() {
  yield takeLatest(SEARCH_HASHTAG_REQUEST, searchHashtag);
}

// -----------------------------------------------------------------------

function toggleWishAPI(data) {
  return Axios.post(`/places/${data.placeId}/togglewish/`, {
    isWished: data.isWished,
  });
}

function* toggleWish(action) {
  try {
    const result = yield call(toggleWishAPI, action.data);
    console.log(result);
    yield put({
      type: TOGGLE_WISH_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: TOGGLE_WISH_FAILURE,
      error: e,
    });
  }
}

function* watchToggleWish() {
  yield takeLatest(TOGGLE_WISH_REQUEST, toggleWish);
}

// -----------------------------------------------------------------------

function editPlaceAPI(data) {
  return Axios.post(`/places/${data.placeId}/edit/`, data.formData);
}

function* editPlace(action) {
  try {
    console.log(action.data);
    const result = yield call(editPlaceAPI, action.data);
    yield put({
      type: EDIT_PLACE_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: EDIT_PLACE_FAILURE,
      error: e,
    });
  }
}

function* watchEditPlace() {
  yield takeLatest(EDIT_PLACE_REQUEST, editPlace);
}

// -----------------------------------------------------------------------

function removePlaceAPI(placeId) {
  return Axios.post(`/places/${placeId}/delete/`);
}

function* removePlace(action) {
  try {
    if (window.confirm("정말 삭제하시겠습니끼?") === false) {
      return;
    }
    const result = yield call(removePlaceAPI, action.data);
    yield put({
      type: REMOVE_PLACE_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: REMOVE_PLACE_FAILURE,
      error: e,
    });
  }
}

function* watchRemovePlace() {
  yield takeLatest(REMOVE_PLACE_REQUEST, removePlace);
}

export default function* placeSaga() {
  yield all([
    fork(watchLoadPlaces),
    fork(watchAddPlace),
    fork(watchCategorizedPlace),
    fork(watchLoadPlaceDetail),
    fork(watchLoadComments),
    fork(watchAddComment),
    fork(watchToggleLike),
    fork(watchToggleWish),
    fork(watchSearchPlace),
    fork(watchSearchHashtag),
    fork(watchEditPlace),
    fork(watchRemovePlace),
  ]);
}
