import React, { Component } from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  updateStockName,
  changeTimeSeries,
  getData,
} from "../actions/GraphAction";
// import store from "../store/configureStore";

class DailyStock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stockName: props.stockName,
      timeSeriesSetting: "DAILY",

      xValues: [],
      yValues: [],
      ohlc_data: [],

      series: [],
      options: props.options,
      data: props.data,
    };

    this.fetchStock = this.fetchStock.bind(this);
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
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

    // if (this.state.stockName !== this.props.stockName) {
    if (prevProps.stockName !== this.props.stockName) {
      this.props.getData(this.state.timeSeriesSetting, this.state.stockName);
      this.setState(
        {
          stockName: this.props.stockName,
        },
        () => this.fetchStock()
      );
    }
  }

  componentDidMount() {
    this.props.changeTimeSeries(this.state.timeSeriesSetting);
    this.props.getData(this.state.timeSeriesSetting, this.state.stockName);
  }

  fetchStock() {
    // console.log(this.state.xValues);
    // console.log(this.state.yValues);
    // console.log(this.state.ohlc_data);
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
        ...this.state.options,
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
    return (
      <div>
        <p hello={this.props.options}></p>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="candlestick"
          height={350}
          width="100%"
        />
      </div>
    );
  }
}

DailyStock.propsTypes = {
  stockName: PropTypes.string.isRequired,
  updateStockName: PropTypes.func.isRequired,
  xValues: PropTypes.array.isRequired,
  yValues: PropTypes.array.isRequired,
  ohlc_data: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  stockName: state.graph.stockName,
  xValues: state.graph.data.xValues,
  yValues: state.graph.data.yValues,
  ohlc_data: state.graph.data.ohlc_data,
  options: state.graph.options,
});

export default connect(mapStateToProps, {
  updateStockName,
  changeTimeSeries,
  getData,
})(DailyStock);
