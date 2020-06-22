import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  EDIT_NICKNAME_REQUEST,
  EDIT_NICKNAME_SUCCESS,
  EDIT_NICKNAME_FAILURE,
} from "../_Actions/types";
import Axios from "axios";

function loadUserAPI(userId) {
  return Axios.get(`/users/${userId}`);
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_USER_FAILURE,
      error: e,
    });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function editNickNameAPI(data) {
  return Axios.patch(`/users/${data.userId}/nickname`, { nickname: data.nickname });
}

function* editNickName(action) {
  try {
    const result = yield call(editNickNameAPI, action.data);
    yield put({
      type: EDIT_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: EDIT_NICKNAME_FAILURE,
      error: e,
    });
  }
}

function* watchEditNickName() {
  yield takeLatest(EDIT_NICKNAME_REQUEST, editNickName);
}

export default function* userSaga() {
  yield all([fork(watchLoadUser), fork(watchEditNickName)]);
}
