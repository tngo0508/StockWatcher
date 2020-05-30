import React, {Component} from "react";
import DailyStock from "./DailyStock";
import MonthlyStock from "./MonthlyStock";
import WeeklyStock from "./WeeklyStock";

export default class InputForum extends Component{
    constructor(props){
        super(props);

        this.input = React.createRef();

        this.state = {
            stockName: "",
            text: "",
        }

        this.updateStock = this.updateStock.bind(this);
        this.getStockInfo = this.getStockInfo.bind(this);
        this.updateText = this.updateText.bind(this);
    }

    updateStock(e){
        this.setState({stockName: this.input.current["value"]});
    }

    updateText(e){
        this.searchText = e.target.value;
    }

    getStockInfo(e){
        console.log(this.state.stockName);
    }

    render(){
        return (
            <div>
                <form>
                    <input type="text" placeholder="Enter Stock Name" ref = {this.input} ></input>
                    <input type="button" stockname={this.state.stockName} value="search" onClick={this.updateStock}></input>
                </form>
                <DailyStock stockname={this.state.stockName}></DailyStock>
                <WeeklyStock stockname={this.state.stockName}></WeeklyStock>
                <MonthlyStock stockname={this.state.stockName}></MonthlyStock>
            </div>
            
        );
    }
}