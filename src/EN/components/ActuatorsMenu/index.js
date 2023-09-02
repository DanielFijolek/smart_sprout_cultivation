import React from "react";
import ActuatorsContainer from "../ActuatorsContainer";
import { Link } from "react-router-dom";
const Actuators = () => {
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <div className="Actuators">
      <div className="TopMenu">
        <Link className="button" to="/EN">
          <button className="button ">Sensors</button>
        </Link>
        <Link className="button buttonActive" to="/EN/actuators">
          <button className="button" onClick={refreshPage}>
            Actuators
          </button>
        </Link>
        <Link className="button " to="/EN/chart">
          <button className="button">Graph</button>
        </Link>
      </div>
      <ActuatorsContainer />
    </div>
  );
};

export default Actuators;
