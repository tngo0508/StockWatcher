import { combineReducers } from "redux";
import graphReducer from "./GraphReducer";

export default combineReducers({
  graph: graphReducer,
});
