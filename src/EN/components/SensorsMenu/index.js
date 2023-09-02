import React from "react";
import ElementContainer from "../ElementContainer";
import { Link } from "react-router-dom";

const Menu = () => {
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="Sensors">
      <div className="TopMenu">
        <Link className="button buttonActive" to="/EN">
          <button className="button " onClick={refreshPage}>
            Sensors
          </button>
        </Link>
        <Link className="button" to="/EN/actuators">
          <button className="button">Actuators</button>
        </Link>
        <Link className="button " to="/EN/chart">
          <button className="button">Graph</button>
        </Link>
      </div>
      <ElementContainer />
    </div>
  );
};

export default Menu;
