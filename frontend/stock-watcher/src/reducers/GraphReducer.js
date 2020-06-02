import { UPDATE_STOCK_SYMBOL } from "../actions/types";

const initialState = {
  stockName: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STOCK_SYMBOL:
      return {
        ...state,
        stockName: action.payload.stockName,
      };
    default:
      return state;
  }
};
