import React, { Component } from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  updateStockName,
  changeTimeSeries,
  getData,
} from "../actions/GraphAction";
import store from "../store/configureStore";

class DailyStock extends Component {
  constructor(props) {
    super(props);

    console.log(props.options);

    this.state = {
      stockName: props.stockName,
      timeSeriesSetting: "DAILY",

      stockChartXValues: [],
      stockChartYValues: [],

      series: [],
      options: props.options,
      data: props.data,
    };

    this.fetchStock = this.fetchStock;
  }

  componentDidUpdate() {
    //console.log(this.state.stockName + " != " + this.props.stockName);
    if (this.state.stockName !== this.props.stockName) {
      this.setState(
        {
          stockName: this.props.stockName,
          data: this.props.data,
          options: this.props.options,
        },
        () => this.fetchStock()
      );
      //this.fetchStock();
    }
  }

  componentDidMount() {
    this.props.changeTimeSeries(this.state.timeSeriesSetting);
    this.props.getData(this.state.timeSeriesSetting, this.state.stockName);
    //   this.setState(
    //     {
    //       data: this.props.data,
    //       options: this.props.options,
    //     },
    //     () => this.fetchStock()
    //   );
  }

  fetchStock() {
    // this.setState({
    //   stockChartXValues: stockChartXValuesFunction,
    //   stockChartYValues: stockChartYValuesFunction,
    //   series: [
    //     {
    //       name: this.state.stockName,
    //       data: temp,
    //     },
    //   ],
    //   options: {
    //     ...this.state.options,
    //     title: {
    //       ...this.state.title,
    //       text: this.timeSeriesSetting + " trading for " + this.state.stockName,
    //     },
    //     labels: stockChartXValuesFunction,
    //   },
    // });
  }

  render() {
    return (
      <div>
        <p hello={this.props.options}></p>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="area"
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
};

const mapStateToProps = (state) => ({
  stockName: state.graph.stockName,
  data: state.graph.data,
  options: state.graph.options,
});

export default connect(mapStateToProps, {
  updateStockName,
  changeTimeSeries,
  getData,
})(DailyStock);
