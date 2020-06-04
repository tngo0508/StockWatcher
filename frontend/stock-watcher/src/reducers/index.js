import { combineReducers } from "redux";
import dailyGraphReducer from "./DailyGraphReducer";
import monthlyGraphReducer from "./MonthlyGraphReducer";

export default combineReducers({
  daily: dailyGraphReducer,
  monthly: monthlyGraphReducer,
});
