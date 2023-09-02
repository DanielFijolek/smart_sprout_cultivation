import React, { useState } from "react";

const ActuatorWaterPump = () => {
  const [time, setTime] = useState("");

  async function reqSwitchOnTime() {
    try {
      if (time) {
        const req = await fetch(
          `http://10.8.0.34:5000/api/pump/start?time=${time}`
        );
        console.log(req);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="Actuator">
      <div className="sensorName">Water pump</div>

      <div className="buttonContainer">
        <input
          type="number"
          placeholder="Time [s]"
          onChange={(e) => setTime(e.currentTarget.value)}
        ></input>
        <button
          onClick={() => {
            reqSwitchOnTime();
          }}
        >
          Turn ON
        </button>
      </div>
    </div>
  );
};

export default ActuatorWaterPump;
