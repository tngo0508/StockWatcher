import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { dailySetOptions } from "../actions/DailyGraphAction";
import { monthlySetOptions } from "../actions/MonthlyGraphAction";
import MonthlyStock from "./MonthlyStock";
// import WeeklyStock from "./WeeklyStock";
import DailyStock from "./DailyStock";

class DisplayStock extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    this.props.dailySetOptions(this.state.options);
    this.props.monthlySetOptions(this.state.options);
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col mt-5">
            <h1 className="text-center">Stock market</h1>
            <DailyStock />
            <MonthlyStock />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

DisplayStock.propsTypes = {
  dailySetOptions: PropTypes.func.isRequired,
};

export default connect(null, {
  dailySetOptions,
  monthlySetOptions,
})(DisplayStock);
