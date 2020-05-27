import React, { Component } from "react";
import Chart from "react-apexcharts";
import moment from "moment";

export default class WeeklyStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],

      series: [],
      // series: [{
      //   name: "STOCK ABC",
      //   data: series.monthDataSeries1.prices
      // }],
      options: {
        chart: {
          type: "area",
          height: 350,
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },

        title: {
          text: "Company ABC Daily Stocks",
          align: "left",
        },
        subtitle: {
          text: "Price Movements",
          align: "left",
        },
        labels: [],
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          opposite: true,
          labels: {
            formatter: function (value) {
              return value.toString() + " USD";
            },
          },
        },
        legend: {
          horizontalAlign: "left",
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
    const timeSeriesSetting = "WEEKLY";
    let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_${timeSeriesSetting}&symbol=${stockSymbol}&outputsize=compact&apikey=${API_KEY}`;

    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_CALL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        const stockTimeSeries = Object.keys(data)[1];

        Object.keys(data[stockTimeSeries]).map((date) => {
          // console.log(date);
          stockChartXValuesFunction.push(date);
          const prices = Object.values(data[stockTimeSeries][date]);
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

        // console.log(temp);

        this.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction,
          series: [
            {
              name: stockSymbol,
              data: temp,
            },
          ],
          options: {
            ...this.state.options,
            title: {
              ...this.state.title,
              text: timeSeriesSetting + " trading for " + stockSymbol,
            },
            labels: stockChartXValuesFunction,
          },
        });
      });
  }

  render() {
    return (
      <div className="row">
        <div className="col mt-5">
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="area"
            height={350}
            width="100%"
          />
        </div>
      </div>
    );
  }
}
