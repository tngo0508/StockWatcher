import {
  WEEKLY_UPDATE_STOCK_SYMBOL,
  WEEKLY_GET_DATA,
  WEEKLY_SET_OPTIONS,
} from "../actions/types";

const initialState = {
  stockName: "",
  timeSeriesSetting: "",
  options: {},
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case WEEKLY_GET_DATA:
      return {
        ...state,
        data: action.payload.data,
      };
    case WEEKLY_UPDATE_STOCK_SYMBOL:
      return {
        ...state,
        stockName: action.payload.stockName,
      };
    case WEEKLY_SET_OPTIONS:
      return {
        ...state,
        options: action.payload.options,
      };
    default:
      return state;
  }
};
