import { getdemoSaga } from "../features/demoSaga";
import { all, takeEvery, takeLatest } from "redux-saga/effects";
import Api from "../services/Api";
const api = Api.create();
export { api };
export default function* root() {
  yield all([takeEvery("getdemoSagacalled", getdemoSaga, api)]);
}
