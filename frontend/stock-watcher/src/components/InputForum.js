import React, { Component } from "react";
import DailyStock from "./DailyStock";
// import MonthlyStock from "./MonthlyStock";
// import WeeklyStock from "./WeeklyStock";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateStockName } from "../actions/GraphAction";
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
      this.props.updateStockName(this.state.stockName);
    }
  };

  //   componentDidMount() {
  //     this.props.updateStockName();
  //   }

  stockSymbolChange = () => {
    const currentState = store.getState();
    if (currentState.graph.stockName) {
      console.log(currentState.graph.stoc);
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
        {this.props.stockName && (
          <DisplayStock stockName={this.props.stockName} />
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
  updateStockName: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stockName: state.graph.stockName,
});

export default connect(mapStateToProps, { updateStockName })(InputForum);
