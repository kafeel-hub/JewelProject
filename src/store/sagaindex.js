import { getdemoSaga } from "../features/demo/demoSaga";
import { all, takeEvery, takeLatest } from "redux-saga/effects";
import Api from "../services/Api";
import {
  signIn,
  signUp,
  logout,
  getCompanylist,
  getCompanyBranchlist,
  getCompanyDetails,
} from "../features/auth/authSaga";
const api = Api.create();
export { api };
export default function* root() {
  yield all([
    takeEvery("getdemoSagacalled", getdemoSaga, api),
    takeEvery("signInCalled", signIn, api),
    takeLatest("signUpCalled", signUp, api),
    takeLatest("logoutCalled", logout, api),
    takeEvery("getCompanylistcalled", getCompanylist, api),
    takeEvery("getCompanyBranchlistcalled", getCompanyBranchlist, api),
    takeEvery("getCompanyDetailscalled", getCompanyDetails, api),
  ]);
}
