import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "react-lazy-load-image-component/src/effects/blur.css"; //its from rllic documentaion.

import "bootstrap/dist/css/bootstrap.min.css"; //iske bina bootstrap css work ni karega.

import "./_base.scss";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
