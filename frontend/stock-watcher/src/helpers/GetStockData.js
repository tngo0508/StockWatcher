const getStockData = async (timeSeriesSetting, stockName) => {
  // console.log(timeSeriesSetting);
  // console.log(stockName);
  // console.log(API_KEY);
  const API_KEY = "VH65CPTN371HAJQL";

  const set_url = (timeSeriesSetting) => {
    switch (timeSeriesSetting) {
      case "DAILY":
        return `https://www.alphavantage.co/query?function=TIME_SERIES_${timeSeriesSetting}&symbol=${stockName}&outputsize=compact&apikey=${API_KEY}`;
      case "MONTHLY":
        return `https://www.alphavantage.co/query?function=TIME_SERIES_${timeSeriesSetting}&symbol=${stockName}&apikey=${API_KEY}`;
      case "WEEKLY":
        return `https://www.alphavantage.co/query?function=TIME_SERIES_${timeSeriesSetting}&symbol=${stockName}&apikey=${API_KEY}`;
      default:
        break;
    }
  };

  let API_CALL = set_url(timeSeriesSetting);
  console.log(API_CALL);

  let xValues = [];
  let yValues = [];

  let response = await fetch(API_CALL);
  let data = await response.json();

  console.log(response, data);

  const stockTimeSeries = Object.keys(data)[1];

  Object.keys(data[stockTimeSeries]).map((date) => {
    xValues.push(date);
    const prices = Object.values(data[stockTimeSeries][date]);
    yValues.push(prices);

    return { xValues, yValues };
  });

  let ohlc_data = xValues.map((x, idx) => {
    return {
      x,
      y: yValues[idx].slice(0, 4).map((p) => {
        return parseFloat(p).toFixed(2);
      }),
    };
  });

  return {
    xValues,
    yValues,
    ohlc_data,
  };
};

export default getStockData;
