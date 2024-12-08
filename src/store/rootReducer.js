import { combineReducers } from "redux";
import demo from "../features/demo/demoSlice";
import auth,{logOut}  from "../features/auth/authSlice";
// const rootReducer = combineReducers({
//   demo,
//   auth,
// });

const appReducer = combineReducers({
  demo,
  auth,
});

const rootReducer = (state, action) => {
  if (action.type === logOut.type) {
    state = undefined; 
  }
  return appReducer(state, action);
};

export default rootReducer;
