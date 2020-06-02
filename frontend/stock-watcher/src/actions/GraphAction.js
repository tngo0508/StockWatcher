import { UPDATE_STOCK_SYMBOL } from "./types";

export const updateStockName = (updates) => {
  return {
    type: UPDATE_STOCK_SYMBOL,
    payload: {
      stockName: updates,
    },
  };
};
