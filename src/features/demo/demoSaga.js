import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchDemoDataFailure,
  fetchDemoDataSuccess,
  fetchDemoDataRequest,
} from "./demoSlice";
import Api from "../../services/ApiCaller";

export function* getdemoSaga(api, { payload = {} }) {
  yield put(fetchDemoDataRequest(true));
  try {
    // const { limit } = payload;
    const token = yield getAccessToken();
    const result = yield call(
      Api.callServer,
      api.getDemo,
      //   { token, limit },
      true
    );
    yield put(fetchDemoDataSuccess(result));
  } catch (error) {
    yield put(fetchDemoDataFailure(error));
  } finally {
    yield put(fetchDemoDataRequest(false));
  }
}
