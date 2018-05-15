import React, { Component } from "react";
import { AppRegistry } from "react-native";
import App from "./src/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./src/reducers";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default class HRrecruit extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent("HRrecruit", () => HRrecruit);
