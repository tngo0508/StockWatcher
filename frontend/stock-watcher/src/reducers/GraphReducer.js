import {
  UPDATE_STOCK_SYMBOL,
  CHANGE_TIME_SERIES,
  GET_DATA,
  SET_OPTIONS,
} from "../actions/types";

const initialState = {
  stockName: "",
  timeSeriesSetting: "",

  xValues: [],
  yValues: [],

  series: [],
  options: {},
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        data: action.payload.data,
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
    case SET_OPTIONS:
      return {
        ...state,
        options: action.payload.options,
      };
    default:
      return state;
  }
};
