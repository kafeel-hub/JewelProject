import { combineReducers } from "redux";
import demo from "../features/demo/demoSlice";

const rootReducer = combineReducers({
  demo, // Add other reducers here as needed
});

export default rootReducer;
