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
  LOAD_IS_LIKED_REQUEST,
  LOAD_IS_LIKED_SUCCESS,
  LOAD_IS_LIKED_FAILURE,
  LOAD_MORE_COMMENTS_SUCCESS
} from "../_Actions/types";
import Axios from "axios";

Axios.defaults.baseURL = "http://localhost:5000/api/";
function loadPlacesAPI() {
  return Axios.get("/places");
}

function* loadPlaces(action) {
  try {
    const result = yield call(loadPlacesAPI, action.data);
    yield put({
      type: LOAD_MAIN_PLACES_SUCCESS,
      data: result.data.places,
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
      data: result.data.places,
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
      data: result.data.placeInfo,
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

function loadCommentsAPI(placeId, offset=0){
  return Axios.get(`/places/${placeId}/comments?offset=${offset}`)
}

function* loadComments(action){
  try {
    const result = yield call(loadCommentsAPI, action.data, action.offset);
    console.log(result);
    yield put({
      // type: LOAD_COMMENTS_SUCCESS,
      type: LOAD_MORE_COMMENTS_SUCCESS,
      data: result.data
    })
  } catch(e){
    console.error(e);
    yield put({
      type: LOAD_COMMENTS_FAILURE,
      error: e
    })
  }
}

function* watchLoadComments(){
  yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments);
}


// -----------------------------------------------------------------------

function loadPlaceDetailAPI(placeId){
  return Axios.get(`/places/${placeId}/`)
}

function* loadPlaceDetail(action){
  try {
    const result = yield call(loadPlaceDetailAPI, action.data);
    const comments = yield call(loadCommentsAPI, action.data);
    yield put({
      type: LOAD_PLACE_DETAIL_SUCCESS,
      data: result.data
    })
    yield put({
      type: LOAD_COMMENTS_SUCCESS,
      data: comments.data,
    })
  } catch(e){
    console.error(e);
    yield put({
      type: LOAD_PLACE_DETAIL_FAILURE,
      error: e
    })
  }
}

function* watchLoadPlaceDetail(){
  yield takeLatest(LOAD_PLACE_DETAIL_REQUEST, loadPlaceDetail);
}


// -----------------------------------------------------------------------

function addCommnetAPI(data){
  return Axios.post(`/places/${data.placeId}/comment`, { text: data.comment });
}

function* addComment(action){
  try {
    const result = yield call(addCommnetAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data
    })
  } catch(e){
    console.error(e);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e
    })
  }
}

function* watchAddComment(){
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

// -----------------------------------------------------------------------

function toggleLikeAPI(data){
  return Axios.post(`/places/${data.placeId}/togglelike`, { isLiked: data.isLiked });
}

function* toggleLike(action){
  try {
    const result = yield call(toggleLikeAPI, action.data);
    yield put({
      type: TOGGLE_LIKE_SUCCESS,
      data: result.data
    })
  } catch(e){
    console.error(e);
    yield put({
      type: TOGGLE_LIKE_FAILURE,
      error: e
    })
  }
}

function* watchToggleLike(){
  yield takeLatest(TOGGLE_LIKE_REQUEST, toggleLike);
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
  ]);
}
