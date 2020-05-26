import React, { Component } from "react";
// import Plot from "react-plotly.js";

export default class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
    };
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    const API_KEY = "VH65CPTN371HAJQL";
    let stockSymbol = "AAPL";
    let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&outputsize=compact&apikey=${API_KEY}`;

    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_CALL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        Object.keys(data["Time Series (Daily)"]).map((date) => {
          // console.log(date);
          stockChartXValuesFunction.push(date);
          const open = Object.values(data["Time Series (Daily)"][date])[0];
          // console.log(open);
          stockChartYValuesFunction.push(open);
        });

        // console.log(stockChartXValuesFunction);
        // console.log(stockChartYValuesFunction);

        this.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction,
        });
      });
  }

  render() {
    return (
      <div>
        <h1>Stock Market</h1>
        {/* <p>x-values: {this.state.stockChartXValues}</p>
        <p>y-values: {this.state.stockChartYValues}</p> */}

        {/* <Plot
          data={[
            {
              x: [1, 2, 3],
              y: [2, 6, 3],
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "red" },
            },
            { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
          ]}
          layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
        /> */}
      </div>
    );
  }
}
