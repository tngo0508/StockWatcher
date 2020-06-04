import React, { Component } from "react";
// import DailyStock from "./DailyStock";
// import MonthlyStock from "./MonthlyStock";
// import WeeklyStock from "./WeeklyStock";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { dailyUpdateStockName } from "../actions/DailyGraphAction";
import { monthlyUpdateStockName } from "../actions/MonthlyGraphAction";
import { weeklyUpdateStockName } from "../actions/WeeklyGraphAction";
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
      this.props.dailyUpdateStockName(this.state.stockName);
      this.props.monthlyUpdateStockName(this.state.stockName);
      this.props.weeklyUpdateStockName(this.state.stockName);
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
      <div className="mt-5">
        <form
          className="form-inline d-flex justify-content-center"
          onSubmit={this.onSubmit}
        >
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">Stock Symbol</div>
              </div>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Stock Name"
                autoFocus
                onChange={this.onChange}
              />
            </div>

            <button className="btn btn-primary">Search</button>
          </div>
        </form>

        {this.props.stockName && !this.state.error ? (
          <DisplayStock />
        ) : (
          <p>{this.state.error}</p>
        )}
      </div>
    );
  }
}

InputForum.propsTypes = {
  stockName: PropTypes.string.isRequired,
  dailyUpdateStockName: PropTypes.func.isRequired,
  monthlyUpdateStockName: PropTypes.func.isRequired,
  weeklyUpdateStockName: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stockName: state.daily.stockName,
});

export default connect(mapStateToProps, {
  dailyUpdateStockName,
  monthlyUpdateStockName,
  weeklyUpdateStockName,
})(InputForum);
