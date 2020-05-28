import React, {Component} from "react";

export default class InputForum extends Component{
    constructor(props){
        super(props);

        this.state = {
            stockName: "",
        }

        this.updateState = this.updateState.bind(this);
        this.getStockInfo = this.getStockInfo.bind(this);
    }

    updateState(e){
        this.setState({stockName: e.target.value});
    }

    getStockInfo(e){
        console.log(this.state.stockName);
    }

    render(){
        return (
            <div>
                <form>
                    <input type="text" placeholder="Enter Stock Name" value = {this.state.stockName} onChange={this.updateState}></input>
                    <input type="button" stockname={this.state.stockName} value="search" onClick={this.props.OnClick}></input>
                </form>
            </div>
            
        );
    }
}