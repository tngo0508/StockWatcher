import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import InputForum from "./components/InputForum";
import { Provider } from "react-redux";
import store from "./store/configureStore";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="container">
          <InputForum></InputForum>
        </div>
      </div>
    </Provider>
  );
}

export default App;
