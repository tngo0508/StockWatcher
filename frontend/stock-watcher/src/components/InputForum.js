import React, { Component } from "react";
// import DailyStock from "./DailyStock";
// import MonthlyStock from "./MonthlyStock";
// import WeeklyStock from "./WeeklyStock";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { dailyUpdateStockName } from "../actions/DailyGraphAction";
import { monthlyUpdateStockName } from "../actions/MonthlyGraphAction";
import store from "../store/configureStore";
import DisplayStock from "./DisplayStock";

class InputForum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stockName: "",
      error: "",
    };
  }

  onChange = (e) => {
    const stockName = e.target.value;
    this.setState({ stockName });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.stockName) {
      this.setState(() => ({
        error: "Please enter a stock.",
      }));
    } else {
      this.setState(() => ({ error: "" }));
      //console.log(this.state.stockName);
      this.props.dailyUpdateStockName(this.state.stockName);
      this.props.monthlyUpdateStockName(this.state.stockName);
    }
  };

  stockSymbolChange = () => {
    const currentState = store.getState();
    if (currentState.daily.stockName) {
      console.log(currentState.daily.stockName);
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Enter Stock Name"
            onChange={this.onChange}
          />
          <button>Search</button>
        </form>
        {this.props.stockName && !this.state.error ? (
          <DisplayStock />
        ) : (
          <p>{this.state.error}</p>
        )}

        {/* <DailyStock stockName={this.props.stockName}></DailyStock> */}
        {/* <WeeklyStock stockname={this.state.stockName}></WeeklyStock>
        <MonthlyStock stockname={this.state.stockName}></MonthlyStock> */}
      </div>
    );
  }
}

InputForum.propsTypes = {
  stockName: PropTypes.string.isRequired,
  dailyUpdateStockName: PropTypes.func.isRequired,
  monthlyUpdateStockName: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stockName: state.daily.stockName,
});

export default connect(mapStateToProps, {
  dailyUpdateStockName,
  monthlyUpdateStockName,
})(InputForum);
