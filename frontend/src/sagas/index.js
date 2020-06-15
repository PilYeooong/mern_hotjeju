import { all, call } from "redux-saga/effects";
import place from "./place";
import user from "./user";
import image from "./image";

export default function* rootSaga() {
  yield all([
    call(place),
    call(user),
    call(image),
  ]) 
}