import {
  all,
  fork,
  takeLatest,
  call,
  put,
} from "redux-saga/effects";

import { ADD_PLACE_REQUEST, ADD_PLACE_SUCCESS, ADD_PLACE_FAILURE, LOAD_MAIN_PLACES_REQUEST, LOAD_MAIN_PLACES_FAILURE, LOAD_MAIN_PLACES_SUCCESS } from "../_Actions/types";
import Axios from "axios";

function loadPlacesAPI(){
  return Axios.get('/api/places/');
}

function* loadPlaces(action){
  try {
    const result = yield call(loadPlacesAPI, action.data);
    yield put({
      type: LOAD_MAIN_PLACES_SUCCESS,
      data: result.data.places
    })
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_MAIN_PLACES_FAILURE,
      error: e
    })
  }
}

function* watchLoadPlaces(){
  yield takeLatest(LOAD_MAIN_PLACES_REQUEST, loadPlaces);
}

function addPlaceAPI(placeData){
  return Axios.post('/api/places/new/', placeData);
}

function* addPlace(action){
  try{
    const result = yield call(addPlaceAPI, action.data);
    yield put({
      type: ADD_PLACE_SUCCESS,
      data: result.data.placeInfo
    })
  } catch(e) {
    console.error(e);
    yield put({
      type: ADD_PLACE_FAILURE,
      error: e
    })
  }
}

function* watchAddPlace(){
  yield takeLatest(ADD_PLACE_REQUEST, addPlace);
}

export default function* placeSaga() {
  yield all([
    fork(watchLoadPlaces),
    fork(watchAddPlace),
  ]);
}