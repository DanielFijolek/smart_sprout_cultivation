import React from "react";

import ReactDOM from "react-dom";
import "./index.css";
import App from "./MainApp/App";
import reportWebVitals from "./reportWebVitals";
import "react-datepicker/dist/react-datepicker.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
