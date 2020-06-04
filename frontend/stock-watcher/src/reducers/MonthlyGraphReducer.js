import {
  MONTHLY_UPDATE_STOCK_SYMBOL,
  MONTHLY_GET_DATA,
  MONTHLY_SET_OPTIONS,
} from "../actions/types";

const initialState = {
  stockName: "",
  timeSeriesSetting: "",
  options: {},
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MONTHLY_GET_DATA:
      return {
        ...state,
        data: action.payload.data,
      };
    case MONTHLY_UPDATE_STOCK_SYMBOL:
      return {
        ...state,
        stockName: action.payload.stockName,
      };
    // case CHANGE_TIME_SERIES:
    //   return {
    //     ...state,
    //     timeSeriesSetting: action.payload.timeSeriesSetting,
    //   };
    case MONTHLY_SET_OPTIONS:
      return {
        ...state,
        options: action.payload.options,
      };
    default:
      return state;
  }
};
