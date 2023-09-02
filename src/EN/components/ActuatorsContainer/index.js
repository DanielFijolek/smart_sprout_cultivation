import React from "react";
import ActuatorWaterPump from "../Actuators/waterPump";
import Fan from "../Actuators/fan";
import Buzzer from "../Actuators/buzzer";
import Led from "../Actuators/led";

const ActuatorsContainer = () => {
  return (
    <div className="ActuatorsContainer">
      <ActuatorWaterPump />
      <Led
        key="LED 30"
        name="LED strip 1"
        actuator="led60"
        dataBaseName="led60"
        nr="34"
      />
      <Led
        key="LED Grove"
        name="LED strip 2"
        actuator="ledgrove"
        dataBaseName="ledgrove"
        nr="34"
      />
      <Led
        key="LED 60222"
        name="LED strip 3"
        actuator="led60"
        dataBaseName="led60222"
        nr="38"
      />
      <Led
        key="LED Grove 222"
        name="LED strip 4"
        actuator="ledgrove"
        dataBaseName="ledgrove222"
        nr="38"
      />
      <Led
        key="LED Chainable Grove"
        name="LED chain"
        actuator="ledchainablegrove"
        dataBaseName="ledchainablegrove"
        nr="38"
      />
      <Fan key="Fan" name="Fan" reqNumber="" />
      <Buzzer />
    </div>
  );
};

export default ActuatorsContainer;
