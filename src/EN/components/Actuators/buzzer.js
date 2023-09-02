import React, { useState } from "react";

const Buzzer = () => {
  const [repeats, setRepeats] = useState("");

  async function reqSwitchOnTime() {
    try {
      if (repeats) {
        const req = await fetch(
          `http://10.8.0.34:5000/api/buzzer/start?repeat=${repeats}`
        );
      } else {
        const req = await fetch(
          `http://10.8.0.34:5000/api/buzzer/start?repeat=1`
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="Actuator">
      <div className="sensorName">Buzzer</div>
      <div className="buttonContainer">
        <input
          type="number"
          placeholder="Repeats"
          onChange={(e) => setRepeats(e.currentTarget.value)}
        ></input>
        <button
          onClick={() => {
            reqSwitchOnTime();
          }}
        >
          Play
        </button>
      </div>
    </div>
  );
};

export default Buzzer;
