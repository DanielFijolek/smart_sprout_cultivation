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
        <Link className="button" to="/PL/">
          <button className="button">Sensory</button>
        </Link>
        <Link className="button buttonActive" to="/PL/actuators">
          <button className="button" onClick={refreshPage}>
            Aktuatory
          </button>
        </Link>
        <Link className="button " to="/PL/chart">
          <button className="button">Wykres</button>
        </Link>
      </div>
      <ActuatorsContainer />
    </div>
  );
};

export default Actuators;
