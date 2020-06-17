import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import { LOAD_IMAGES_REQUEST, LOAD_IMAGES_SUCCESS, LOAD_IMAGES_FAILURE } from "../_Actions/types";
import Axios from "axios";


function loadImagesAPI(){
  return Axios.get(`/images`);
}

function* loadImages(){
  try {
    const result = yield call(loadImagesAPI);
    yield put({
      type: LOAD_IMAGES_SUCCESS,
      data: result.data
    })
  } catch(e) {
    console.error(e);
    yield put({
      type: LOAD_IMAGES_FAILURE,
      error: e
    })
  }
}

function* watchLoadImages(){
  yield takeLatest(LOAD_IMAGES_REQUEST, loadImages);
}

export default function* imageSaga() {
  yield all([
    fork(watchLoadImages),
  ])
}