import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import reducers from "./redux/reducers/index";
import "./index.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
registerServiceWorker();
