// src/features/demo/demoSlice.js
import { createSlice } from "@reduxjs/toolkit";

const demoSlice = createSlice({
  name: "demo",
  initialState: {
    demodata: [],
    demoloading: false,
    demoerror: null,
  },
  reducers: {
    fetchDemoDataRequest(state, action) {
      return {
        ...state,
        demoloading: action.payload,
      };
    },
    fetchDemoDataSuccess: (state, action) => {
      return {
        ...state,
        demoloading: false,
        demodata: action.payload,
      };
    },
    fetchDemoDataFailure: (state, action) => {
      return {
        ...state,
        demoloading: false,
        demoerror: action.payload,
      };
    },
  },
});

export const {
  fetchDemoDataRequest,
  fetchDemoDataSuccess,
  fetchDemoDataFailure,
} = demoSlice.actions;

export default demoSlice.reducer;
