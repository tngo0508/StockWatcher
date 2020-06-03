const GetStockData = async (timeSeriesSetting, stockName, API_KEY) => {
  console.log(timeSeriesSetting);
  console.log(stockName);
  console.log(API_KEY);
  let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_${timeSeriesSetting}&symbol=${stockName}&outputsize=compact&apikey=${API_KEY}`;
  let xValues = [];
  let yValues = [];

  let response = await fetch(API_CALL);
  let data = await response.json();

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

export default GetStockData;
