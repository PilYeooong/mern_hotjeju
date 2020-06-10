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
} from "../_Actions/types";
import Axios from "axios";

function loadPlacesAPI() {
  return Axios.get("/api/places/");
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
  return Axios.post(`/api/places/${category}/`);
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
  return Axios.post("/api/places/new/", placeData);
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

function loadPlaceDetailAPI(placeId){
  return Axios.get(`/api/places/${placeId}/`)
}

function* loadPlaceDetail(action){
  try {
    const result = yield call(loadPlaceDetailAPI, action.data);
    yield put({
      type: LOAD_PLACE_DETAIL_SUCCESS,
      data: result.data.place
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

function loadCommentsAPI(placeId, offset=0){
  return Axios.get(`/api/places/${placeId}/comments?offset=${offset}`)
}

function* loadComments(action){
  try {
    const result = yield call(loadCommentsAPI, action.data, action.offset);
    yield put({
      type: LOAD_COMMENTS_SUCCESS,
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

function addCommnetAPI(data){
  return Axios.post(`/api/places/${data.placeId}/comment`, { text: data.comment });
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

export default function* placeSaga() {
  yield all([
    fork(watchLoadPlaces),
    fork(watchAddPlace),
    fork(watchCategorizedPlace),
    fork(watchLoadPlaceDetail),
    fork(watchLoadComments),
    fork(watchAddComment),
  ]);
}
