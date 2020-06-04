import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import InputForum from "./components/InputForum";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="container">
          <h1 className="text-center mt-5">Stock Watcher</h1>
          <InputForum></InputForum>
        </div>
      </div>
    </Provider>
  );
}

export default App;
