import { combineReducers } from "redux";
import demo from "../features/demo/demoSlice";
import auth from "../features/auth/authSlice";
const rootReducer = combineReducers({
  demo,
  auth,
});

export default rootReducer;
