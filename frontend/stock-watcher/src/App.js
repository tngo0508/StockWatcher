import React from "react";
import DailyStock from "./components/DailyStock";
import MonthlyStock from "./components/MonthlyStock";
import WeeklyStock from "./components/WeeklyStock";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <DailyStock></DailyStock>
        
      </div>
    </div>
  );
}

export default App;
