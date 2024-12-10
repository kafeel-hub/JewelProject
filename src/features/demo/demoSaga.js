import { call, put, takeLatest } from "redux-saga/effects";
import {
  ItemInformationFailure,
  ItemInformationSuccess,
  ItemInformationTrigger,
} from "./demoSlice";
import Api from "../../services/ApiCaller";
import { getAccessToken } from "../../store/utilities";

export function* getItemInformation(api, { payload = {} }) {
  yield put(ItemInformationTrigger(true));

  try {
    const { CompanyId, ItemCode } = payload;
    const token = yield getAccessToken();
    const result = yield call(
      Api.callServer,
      api.itemInformation,
      { token, CompanyId, ItemCode },
      true
    );
    let itemDetails = [];
    if (result) {
      itemDetails = JSON.parse(result);
    }
    console.log(itemDetails, "result get");

    yield put(ItemInformationSuccess(itemDetails));
  } catch (error) {
    yield put(ItemInformationFailure(error));
  } finally {
    yield put(ItemInformationTrigger(false));
  }
}
