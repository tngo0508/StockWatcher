import React, { Component } from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  weeklyUpdateStockName,
  weeklyGetData,
} from "../actions/WeeklyGraphAction";
import Spinner from "../layout/spinner";

class WeeklyStock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stockName: props.stockName,
      timeSeriesSetting: "WEEKLY",

      stockChartXValues: [],
      stockChartYValues: [],

      series: [],
      options: {},
    };
    this.fetchStock = this.fetchStock.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.xValues !== this.props.xValues &&
      prevProps.yValues !== this.props.yValues
    ) {
      this.setState(
        {
          xValues: this.props.xValues,
          yValues: this.props.yValues,
          ohlc_data: this.props.ohlc_data,
          options: this.props.options,
        },
        () => this.fetchStock()
      );
    }

    if (prevProps.stockName !== this.props.stockName) {
      this.props.weeklyGetData(
        this.state.timeSeriesSetting,
        this.props.stockName
      );
      this.setState(
        {
          stockName: this.props.stockName,
          xValues: this.props.xValues,
          yValues: this.props.yValues,
          ohlc_data: this.props.ohlc_data,
        },
        () => this.fetchStock()
      );
    }
  }

  componentDidMount() {
    console.log(this.state.timeSeriesSetting, this.state.stockName);
    this.props.weeklyGetData(
      this.state.timeSeriesSetting,
      this.state.stockName
    );
  }

  fetchStock() {
    const rev_xValues = this.state.xValues.slice().reverse();
    const rev_yValues = this.state.yValues.slice().reverse();
    const rev_ohlc_data = this.state.ohlc_data.slice().reverse();

    this.setState({
      xValues: rev_xValues,
      yValues: rev_yValues,
      series: [
        {
          name: this.state.stockName,
          data: rev_ohlc_data,
        },
      ],
      options: {
        ...this.props.options,
        title: {
          ...this.state.title,
          text:
            this.state.timeSeriesSetting +
            " trading for " +
            this.state.stockName,
        },
        labels: this.state.xValues,
      },
    });
  }

  render() {
    const { xValues, yValues, ohlc_data } = this.props;

    if (xValues && yValues && ohlc_data) {
      return (
        <div>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="candlestick"
            height={350}
            width="100%"
          />
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

WeeklyStock.propsTypes = {
  stockName: PropTypes.string.isRequired,
  dailyUpdateStockName: PropTypes.func.isRequired,
  dailyGetData: PropTypes.func.isRequired,
  xValues: PropTypes.array.isRequired,
  yValues: PropTypes.array.isRequired,
  ohlc_data: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  stockName: state.weekly.stockName,
  xValues: state.weekly.data.xValues,
  yValues: state.weekly.data.yValues,
  ohlc_data: state.weekly.data.ohlc_data,
  options: state.weekly.options,
});

export default connect(mapStateToProps, {
  weeklyUpdateStockName,
  weeklyGetData,
})(WeeklyStock);
