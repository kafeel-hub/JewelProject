// src/features/demo/demoSlice.js
import { createSlice } from "@reduxjs/toolkit";

const demoSlice = createSlice({
  name: "demo",
  initialState: {
    itemData: [],
    itemloading: false,
    itemerror: null,
  },
  reducers: {
    ItemInformationTrigger(state, action) {
      return {
        ...state,
        itemloading: action.payload,
      };
    },
    ItemInformationSuccess: (state, action) => {
      return {
        ...state,
        itemloading: false,
        itemData: { ...action.payload },
      };
    },
    ItemInformationFailure: (state, action) => {
      return {
        ...state,
        itemloading: false,
        itemerror: action.payload,
      };
    },
  },
});

export const {
  ItemInformationFailure,
  ItemInformationSuccess,
  ItemInformationTrigger,
} = demoSlice.actions;

export default demoSlice.reducer;
