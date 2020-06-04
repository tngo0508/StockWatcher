import {
  WEEKLY_UPDATE_STOCK_SYMBOL,
  WEEKLY_SET_OPTIONS,
  WEEKLY_GET_DATA,
} from "./types";
import getStockData from "../helpers/GetStockData";

export const weeklyUpdateStockName = (updates) => {
  return {
    type: WEEKLY_UPDATE_STOCK_SYMBOL,
    payload: {
      stockName: updates,
    },
  };
};

export const weeklySetOptions = (options) => {
  return {
    type: WEEKLY_SET_OPTIONS,
    payload: {
      options,
    },
  };
};

export const weeklyGetData = (timeSeriesSetting, stockName) => async (
  dispatch
) => {
  const data = await getStockData(timeSeriesSetting, stockName);
  dispatch({
    type: WEEKLY_GET_DATA,
    payload: {
      data,
    },
  });
};
