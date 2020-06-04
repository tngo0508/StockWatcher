import {
  DAILY_UPDATE_STOCK_SYMBOL,
  // CHANGE_TIME_SERIES,
  DAILY_SET_OPTIONS,
  DAILY_GET_DATA,
} from "./types";
import getStockData from "../helpers/GetStockData";

export const dailyUpdateStockName = (updates) => {
  return {
    type: DAILY_UPDATE_STOCK_SYMBOL,
    payload: {
      stockName: updates,
    },
  };
};

export const dailySetOptions = (options) => {
  return {
    type: DAILY_SET_OPTIONS,
    payload: {
      options,
    },
  };
};

export const dailyGetData = (timeSeriesSetting, stockName) => async (
  dispatch
) => {
  const data = await getStockData(timeSeriesSetting, stockName);
  dispatch({
    type: DAILY_GET_DATA,
    payload: {
      data,
    },
  });
};
