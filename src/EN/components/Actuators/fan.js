import React from "react";
import { GetStatus } from "./hooks/getStatus";
import db from "../../../Firebase";

const Fan = ({ name, reqNumber }) => {
  const [status, setStatus] = GetStatus(`fan${reqNumber}`);

  async function reqSwitchOn() {
    try {
      const req = await fetch(`http://10.8.0.34:5000/api/fan/start`, {
        method: "POST",
      });
      if (status !== undefined) {
        db.collection("actuator").doc(`fan${reqNumber}`).set({ status: "ON" });
      }
      setStatus("ON");
    } catch (error) {
      console.error(error);
    }
  }
  async function reqSwitchOff() {
    try {
      const req = await fetch(`http://10.8.0.34:5000/api/fan/stop`, {
        method: "POST",
      });
      if (status !== undefined) {
        db.collection("actuator").doc(`fan${reqNumber}`).set({ status: "OFF" });
      }
      setStatus("OFF");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="Actuator">
      <div className="sensorName">{name}</div>
      <div className="status" id={status}>
        {status}
      </div>
      <div className="buttons">
        <button
          onClick={() => {
            reqSwitchOn();
          }}
        >
          Turn ON
        </button>
        <button
          onClick={() => {
            reqSwitchOff();
          }}
        >
          Turn OFF
        </button>
      </div>
    </div>
  );
};

export default Fan;
