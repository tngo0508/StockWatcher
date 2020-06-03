import {
  UPDATE_STOCK_SYMBOL,
  CHANGE_TIME_SERIES,
  SET_OPTIONS,
  GET_DATA,
} from "./types";

export const updateStockName = (updates) => {
  return {
    type: UPDATE_STOCK_SYMBOL,
    payload: {
      stockName: updates,
    },
  };
};

export const changeTimeSeries = (timeSeriesSetting) => {
  return {
    type: CHANGE_TIME_SERIES,
    payload: {
      timeSeriesSetting,
    },
  };
};

export const setOptions = (options) => {
  return {
    type: SET_OPTIONS,
    payload: {
      options,
    },
  };
};

export const getData = () => {
  return {
    type: GET_DATA,
  };
};
