import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
import dashboardReducer from "./dashboard";
import historyReducer from "./history";
import topUpReducer from "./topUp";
import transferReducer from "./transfer";
import userReducer from "./user";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  history: historyReducer,
  topUp: topUpReducer,
  transfer: transferReducer,
  dashboard: dashboardReducer,
});
