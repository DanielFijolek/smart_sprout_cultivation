import "./App.css";
import React, { useState } from "react";
import ChartEN from "../EN/components/Chart";
import MenuEN from "../EN/components/SensorsMenu";
import ActuatorsEN from "../EN/components/ActuatorsMenu";
import ChartPL from "../PL/components/Chart";
import MenuPL from "../PL/components/SensorsMenu";
import ActuatorsPL from "../PL/components/ActuatorsMenu";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  const [activPL, setActivPL] = useState("buttonActive");
  const [activEN, setActivEN] = useState(false);

  const changeActivPL = () => {
    setActivPL("buttonActive");
    setActivEN("");
  };

  const changeActivEN = () => {
    setActivEN("buttonActive");
    setActivPL("");
  };

  return (
    <div className="App">
      <Router>
        <div className="changeLanguageContainer">
          <Link to="/PL">
            <button
              className={`changeLanguageButton ${activPL}`}
              onClick={changeActivPL}
            >
              PL
            </button>
          </Link>
          <Link to="/EN">
            <button
              className={`changeLanguageButton ${activEN}`}
              onClick={changeActivEN}
            >
              EN
            </button>
          </Link>
        </div>
        <Switch>
          <Route exact path="/EN/chart" component={ChartEN} />
          <Route exact path="/EN/actuators" component={ActuatorsEN} />
          <Route exact path="/EN" component={MenuEN} />
          <Route exact path="/chart" component={ChartPL} />
          <Route exact path="/actuators" component={ActuatorsPL} />
          <Route exact path="/PL/chart" component={ChartPL} />
          <Route exact path="/PL/actuators" component={ActuatorsPL} />
          <Route path="/" component={MenuPL} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
