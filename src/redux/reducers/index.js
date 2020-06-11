import { userReducer } from "./User.reducer";

import { combineReducers } from "redux";
export default combineReducers({
  user: userReducer,
});
