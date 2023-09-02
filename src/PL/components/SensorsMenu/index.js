import React, { useState } from "react";
import ElementContainer from "../ElementContainer";
import { Link } from "react-router-dom";

const Menu = () => {
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <div className="Sensors">
      <div className="TopMenu">
        <Link className="button buttonActive" to="/PL">
          <button className="button" onClick={refreshPage}>
            Sensory
          </button>
        </Link>
        <Link className="button" to="/PL/actuators">
          <button className="button">Aktuatory</button>
        </Link>
        <Link className="button " to="/PL/chart">
          <button className="button">Wykres</button>
        </Link>
      </div>
      <ElementContainer />
    </div>
  );
};

export default Menu;
