import { all, fork, takeLatest, call, put, throttle } from "redux-saga/effects";
import { LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE } from "../_Actions/types";
import Axios from "axios";


function loadUserAPI(userId){
  return Axios.get(`/users/${userId}`);
}

function* loadUser(action){
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data
    })
  } catch(e) {
    console.error(e);
    yield put({
      type: LOAD_USER_FAILURE,
      error: e
    })
  }
}

function* watchLoadUser(){
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadUser),
  ])
}