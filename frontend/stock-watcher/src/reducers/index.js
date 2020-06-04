import { combineReducers } from "redux";
import dailyGraphReducer from "./DailyGraphReducer";
import monthlyGraphReducer from "./MonthlyGraphReducer";
import weeklyGraphReducer from "./WeeklyGraphReducer";

export default combineReducers({
  daily: dailyGraphReducer,
  monthly: monthlyGraphReducer,
  weekly: weeklyGraphReducer,
});
