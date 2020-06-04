import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { changeTimeSeries, setOptions, getData } from "../actions/GraphAction";
// import MonthlyStock from "./MonthlyStock";
// import WeeklyStock from "./WeeklyStock";
import DailyStock from "./DailyStock";

class DisplayStock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeSeriesSetting: {
        daily: "DAILY",
        weekly: "WEEKLY",
        monthly: "MONTHLY",
      },
      options: {
        chart: {
          type: "area",
          height: 350,
          zoom: {
            enabled: true,
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
          labels: {
            show: true,
            maxHeight: 120,
            style: {
              colors: "black",
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-xaxis-label",
            },
          },
          tickAmount: 100,
          tickPlacement: "on",
        },
        yaxis: {
          opposite: true,
          labels: {
            formatter: function (value) {
              return value.toString() + " USD";
            },
          },
          tooltip: {
            enabled: false,
          },
        },
        legend: {
          horizontalAlign: "left",
        },
      },
    };
  }

  componentDidMount() {
    this.props.setOptions(this.state.options);
  }

  render() {
    return (
      <div className="row">
        <div className="col mt-5">
          <h1 className="text-center">Stock market</h1>
          <DailyStock />
          {/* <WeeklyStock />
          <WeeklyStock /> */}
          {/* <Chart
            options={this.state.options}
            series={this.state.series}
            type="area"
            height={350}
            width="100%"
          /> */}
        </div>
      </div>
    );
  }
}

DisplayStock.propsTypes = {
  stockName: PropTypes.string.isRequired,
  timeSeriesSetting: PropTypes.string.isRequired,
  updateStockName: PropTypes.func.isRequired,
  xValues: PropTypes.array.isRequired,
  yValues: PropTypes.array.isRequired,
  series: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  stockName: state.graph.stockName,
  timeSeriesSetting: state.graph.timeSeriesSetting,
  xValues: state.graph.xValues,
  yValues: state.graph.yValues,
  series: state.graph.series,
  options: state.graph.options,
});

export default connect(mapStateToProps, {
  changeTimeSeries,
  setOptions,
  getData,
})(DisplayStock);
