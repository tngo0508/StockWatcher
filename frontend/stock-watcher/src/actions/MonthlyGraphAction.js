import {
  MONTHLY_UPDATE_STOCK_SYMBOL,
  // CHANGE_TIME_SERIES,
  MONTHLY_SET_OPTIONS,
  MONTHLY_GET_DATA,
} from "./types";
import getStockData from "../helpers/GetStockData";

export const monthlyUpdateStockName = (updates) => {
  return {
    type: MONTHLY_UPDATE_STOCK_SYMBOL,
    payload: {
      stockName: updates,
    },
  };
};

export const monthlySetOptions = (options) => {
  return {
    type: MONTHLY_SET_OPTIONS,
    payload: {
      options,
    },
  };
};

export const monthlyGetData = (timeSeriesSetting, stockName) => async (
  dispatch
) => {
  console.log(timeSeriesSetting, stockName);
  const data = await getStockData(timeSeriesSetting, stockName);
  dispatch({
    type: MONTHLY_GET_DATA,
    payload: {
      data,
    },
  });
};
