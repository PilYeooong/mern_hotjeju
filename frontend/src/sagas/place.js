import {
  all,
  fork,
  takeLatest,
  takeEvery,
  call,
  put,
  take,
  delay,
} from "redux-saga/effects";

import { ADD_PLACE_REQUEST, ADD_PLACE_SUCCESS, ADD_PLACE_FAILURE } from "../_Actions/types";

function addPlaceAPI(){

}

function* addPlace(action){
  try{
    yield delay(2000);
    yield put({
      type: ADD_PLACE_SUCCESS,
      data: "success"
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
    fork(watchAddPlace),
  ]);
}