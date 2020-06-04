import React, { Component } from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  monthlyUpdateStockName,
  monthlyGetData,
} from "../actions/MonthlyGraphAction";
import Spinner from "../layout/spinner";

class MonthlyStock extends Component {
  constructor(props) {
    super(props);
    // console.log(props.stockName);

    this.state = {
      stockName: props.stockName,
      timeSeriesSetting: "MONTHLY",
      xValues: [],
      yValues: [],

      series: [],
      options: {},
    };
    this.fetchStock = this.fetchStock.bind(this);
  }

  componentDidUpdate(prevProps) {
    // console.log(prevProps);
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
      this.props.monthlyGetData(
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
    // console.log(this.props.stockName);
    this.props.monthlyGetData(
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

MonthlyStock.propsTypes = {
  stockName: PropTypes.string.isRequired,
  monthlyUpdateStockName: PropTypes.func.isRequired,
  monthlyGetData: PropTypes.func.isRequired,
  xValues: PropTypes.array.isRequired,
  yValues: PropTypes.array.isRequired,
  ohlc_data: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  stockName: state.monthly.stockName,
  xValues: state.monthly.data.xValues,
  yValues: state.monthly.data.yValues,
  ohlc_data: state.monthly.data.ohlc_data,
  options: state.monthly.options,
});

export default connect(mapStateToProps, {
  monthlyUpdateStockName,
  monthlyGetData,
})(MonthlyStock);
