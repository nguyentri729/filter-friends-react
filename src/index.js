import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore } from "redux";

import reducers from "./redux/reducers/index";
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ &&window.__REDUX_DEVTOOLS_EXTENSION__() // Redux DevTools, a must

const store = createStore(reducers, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
registerServiceWorker();
