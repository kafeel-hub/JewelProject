import { call, put, takeLatest } from "redux-saga/effects";
import {
  setCredential,
  logOut,
  signUpTrigger,
  signupSuccess,
  signupFail,
  loginTrigger,
  loginFail,
  loginSuccess,
  companyListFail,
  companyListTrigger,
  companyListSuccess,
  companyBranchListSuccess,
  companyBranchListFail,
  companyBranchListTrigger,
  CompanyDetailsSuccess,
  CompanyDetailsFail,
  CompanyDetailsTrigger,
} from "./authSlice";
import Api from "../../services/ApiCaller";
import { jwtDecode } from "jwt-decode";
import { getAccessToken } from "../../store/utilities";
export function* signUp(api, { payload = {} }) {
  yield put(signUpTrigger(true));
  let errormsg = "";
  const { name, email, password } = payload;
  try {
    let data = { name, email, password };

    const result = yield call(Api.callServer, api.signUp, data, true);
    yield put(signupSuccess(result));
    callback();
  } catch (errorPayload) {
    yield put(signupFail(errormsg));
  } finally {
    yield put(signUpTrigger(false));
  }
}

export function* signIn(api, { payload = {} }) {
  yield put(loginTrigger(true));
  let erromsg = "";
  const { UserName, UserPassword, ClientCode, navigate } = payload;
  try {
    let data = {
      UserName,
      UserPassword,
      ClientCode,
    };

    const result = yield call(Api.callServer, api.logIn, data, true);

    const parsedResponse = JSON.parse(result);
    if (result) {
      yield put(loginSuccess({...parsedResponse, userName:UserName}));
    }
    yield put(setCredential(parsedResponse));
    const { Token, UserId } = parsedResponse;
    yield call(getCompanylist, api, { payload: { userId: UserId } });
    const token = yield getAccessToken();
    console.log(token, "token get");
    navigate("/company-branch");

  } catch (errorPayload) {
    if (
      errorPayload.message === "Invalidpassword" ||
      errorPayload.message === "Invalid Password"
    ) {
      erromsg = "Invaild password ";
    } else if (
      errorPayload.message === "usernotexist" ||
      errorPayload.message === "User not exist" ||
      errorPayload.message === "User not found"
    ) {
      erromsg = "Account doesn’t exist. Please signup";
    } else if (errorPayload.message === "invalid email or password") {
      erromsg = "Invalid email or password";
    } else if (errorPayload.message === "invalid mobile or password") {
      erromsg = "Invalid mobile or password";
    } else {
      erromsg = errorPayload.message;
    }
    yield put(loginFail(erromsg));
  } finally {
    yield put(loginTrigger(false));
  }
}

export function* logout(api, { payload = {} }) {
  try {
    yield put(logOut()); 
    if (payload?.navigate) {
      payload.navigate("/"); 
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
}

export function* getCompanylist(api, { payload = {} }) {
  yield put(companyListTrigger(true));
  try {
    const { userId } = payload;
    const token = yield getAccessToken();
    const result = yield call(
      Api.callServer,
      api.getCompanylist,
      { token, userId },
      true
    );
    // const list = JSON.parse(result);
    // const companyId = list[0]?.fldID;
    // console.log(companyId, list, "saga");
    let parseResult = []
    if(result){
      parseResult = JSON.parse(result);

    }
    console.log(parseResult, "result get");
    
    yield put(companyListSuccess(parseResult));
    // if (list) {
    //   const result2 = yield call(
    //     Api.callServer,
    //     api.getCompanyLocation,
    //     { token, userId, companyId },
    //     true
    //   );
    //   yield put(companyBranchListSuccess(result2));
    // }
  } catch (error) {
    yield put(companyListFail(error));
  } finally {
    yield put(companyListTrigger(false));
  }
}

export function* getCompanyBranchlist(api, { payload = {} }) {
  yield put(companyBranchListTrigger(true));
  try {
    const { userId, companyId } = payload;
    const token = yield getAccessToken();
    console.log(token, "token");
    const result = yield call(
      Api.callServer,
      api.getCompanyLocation,
      { token, userId, companyId },
      true
    );
    let parseResult = []
    if(result){
      parseResult = JSON.parse(result);

    }
    yield put(companyBranchListSuccess(parseResult));
  } catch (error) {
    yield put(companyBranchListFail(error));
  } finally {
    yield put(companyBranchListTrigger(false));
  }
}

export function* getCompanyDetails(api, { payload = {} }) {
  yield put(CompanyDetailsTrigger(true));
  try {
    const { userId, companyId, locationId,navigate } = payload;
    const token = yield getAccessToken();
    console.log(token, "token");
    const result = yield call(
      Api.callServer,
      api.getCompanyDetails,
      { token, userId, companyId, locationId },
      true
    );
    let parseResult = []
    if(result){
      parseResult = JSON.parse(result);

    }
    yield put(CompanyDetailsSuccess(parseResult));
    navigate("/dashboard");
  } catch (error) {
    yield put(CompanyDetailsFail(error));
  } finally {
    yield put(CompanyDetailsTrigger(false));
  }
}
