import {
  DAILY_UPDATE_STOCK_SYMBOL,
  // CHANGE_TIME_SERIES,
  DAILY_GET_DATA,
  DAILY_SET_OPTIONS,
} from "../actions/types";

const initialState = {
  stockName: "",
  timeSeriesSetting: "",
  options: {},
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DAILY_GET_DATA:
      return {
        ...state,
        data: action.payload.data,
      };
    case DAILY_UPDATE_STOCK_SYMBOL:
      return {
        ...state,
        stockName: action.payload.stockName,
      };
    case DAILY_SET_OPTIONS:
      return {
        ...state,
        options: action.payload.options,
      };
    default:
      return state;
  }
};
