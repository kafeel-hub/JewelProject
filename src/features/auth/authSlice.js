import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    companyList: [],
    companyBranchList: [],
    CompanyDetails: {},
    companyLocation: null,
    otherData: null,
    token: null,
    // auth: false,
    signInLoading: false,
    signInError: undefined,
    signUpLoading: false,
    signupfinish: false,
    signUpError: undefined,
    companyListLoading: false,
    companyListError: undefined,
    companyBranchListLoading: false,
    companyBranchListError: undefined,
    CompanyDetailsLoading: false,
    userName: null,
  },
  reducers: {
    setCredential(state, action) {
      return {
        ...state,
        user: action.payload.UserId,
        token: action.payload.Token,
      };
    },
    logOut: (state) => {
      return {
        ...state,
        user: null,
        token: null,
        signInLoading: false,
        signInError: undefined,
      };
    },

    loginSuccess: (state, action) => {
      return {
        ...state,
        user: action.payload.UserId,
        token: action.payload.Token,
        userName:action.payload.userName,
        signInError: "",
        signInLoading: false,

      };
    },

    loginTrigger: (state, action) => {
      return {
        ...state,
        signInLoading: action.payload,
      };
    },
    loginFail: (state, action) => {
      return {
        signInError: action.payload,
        signInLoading: false,

      };
    },

    signUpTrigger: (state, action) => {
      return {
        ...state,
        signUpLoading: action.payload,
        signupfinish: false,
        signUpError: "",
      };
    },

    signupSuccess: (state, action) => {
      return {
        ...state,
        user: { ...action.payload },
        signInError: "",
      };
    },
    signupFail: (state, action) => {
      return {
        signUpError: action.payload,
      };
    },
    companyListFail: (state, action) => {
      return {
        companyListError: action.payload,
      };
    },
    companyListTrigger: (state, action) => {
      return {
        ...state,
        companyListLoading: action.payload,
      };
    },
    companyListSuccess: (state, action) => {
      return {
        ...state,
        companyList: action.payload,
      };
    },
    companyBranchListFail: (state, action) => {
      return {
        companyBranchListError: action.payload,
      };
    },
    companyBranchListTrigger: (state, action) => {
      return {
        ...state,
        companyBranchListLoading: action.payload,
      };
    },
    companyBranchListSuccess: (state, action) => {
      return {
        ...state,
        companyBranchList: action.payload,
      };
    },

    CompanyDetailsFail: (state, action) => {
      return {
        CompanyDetailsError: action.payload,
      };
    },
    CompanyDetailsTrigger: (state, action) => {
      return {
        ...state,
        CompanyDetailsLoading: action.payload,
      };
    },
    CompanyDetailsSuccess: (state, action) => {
      return {
        ...state,
        CompanyDetails: action.payload,
      };
    },
  },
});

export const {
  setCredential,
  logOut,
  loginSuccess,
  loginFail,
  loginTrigger,
  signUpTrigger,
  signupSuccess,
  signupFail,
  companyListFail,
  companyListTrigger,
  companyListSuccess,
  companyBranchListSuccess,
  companyBranchListFail,
  companyBranchListTrigger,
  CompanyDetailsSuccess,
  CompanyDetailsFail,
  CompanyDetailsTrigger,
} = authSlice.actions;
export default authSlice.reducer;
