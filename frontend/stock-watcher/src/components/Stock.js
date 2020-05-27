import React, { Component } from "react";
import Chart from "react-apexcharts";
// import axios from "axios";
import moment from "moment";

export default class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],

      series: [],
      options: {
        chart: {
          type: "candlestick",
          height: 400,
          width: 100,
        },
        title: {
          text: "AMZN stock",
          align: "left",
        },
        plotOptions: {
          candlestick: {
            colors: {
              upward: "#35BA88",
              downward: "#DF7D46",
            },
          },
        },
        xaxis: {
          type: "datetime",
          labels: {
            formatter: function (value) {
              return moment(value).format("MMM DD HH:mm");
            },
          },
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
      },
    };
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    const API_KEY = "VH65CPTN371HAJQL";
    let stockSymbol = "AMZN";
    let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&outputsize=compact&apikey=${API_KEY}`;

    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_CALL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);

        Object.keys(data["Time Series (Daily)"]).map((date) => {
          // console.log(date);
          stockChartXValuesFunction.push(date);
          const prices = Object.values(data["Time Series (Daily)"][date]);
          // console.log(prices);
          stockChartYValuesFunction.push(prices);

          return { stockChartXValuesFunction, stockChartYValuesFunction };
        });

        // console.log(stockChartXValuesFunction);
        // console.log(stockChartYValuesFunction);

        let temp = stockChartXValuesFunction.map((x, idx) => {
          return {
            x: moment(new Date(x)).format("DD MMM YYYY"),
            y: stockChartYValuesFunction[idx].slice(0, 4).map((p) => {
              return parseFloat(p).toFixed(2);
            }),
          };
        });

        console.log(temp);

        this.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction,
          series: [
            {
              data: temp,
            },
          ],
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 mt-5 mx-auto">
            <h1 className="text-center">Stock market</h1>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="candlestick"
              // height="450"
              // width="100%"
            />
          </div>
        </div>
      </div>
    );
  }
}
