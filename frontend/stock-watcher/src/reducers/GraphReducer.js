import {
  UPDATE_STOCK_SYMBOL,
  CHANGE_TIME_SERIES,
  GET_DATA,
} from "../actions/types";

const initialState = {
  stockName: "",
  timeSeriesSetting: "Daily",

  xValues: [],
  yValues: [],

  series: [],
  options: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        state,
      };
    case UPDATE_STOCK_SYMBOL:
      return {
        ...state,
        stockName: action.payload.stockName,
      };
    case CHANGE_TIME_SERIES:
      return {
        ...state,
        timeSeriesSetting: action.payload.timeSeriesSetting,
      };
    default:
      return state;
  }
};
