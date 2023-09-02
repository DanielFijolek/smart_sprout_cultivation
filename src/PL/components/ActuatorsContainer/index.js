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
        name="Pasek LED 1"
        actuator="led60"
        dataBaseName="led60"
        nr="34"
      />
      <Led
        key="LED Grove"
        name="Pasek LED 2"
        actuator="ledgrove"
        dataBaseName="ledgrove"
        nr="34"
      />
      <Led
        key="LED 60222"
        name="Pasek LED 3"
        actuator="led60"
        dataBaseName="led60222"
        nr="38"
      />
      <Led
        key="LED Grove 222"
        name="Pasek LED 4"
        actuator="ledgrove"
        dataBaseName="ledgrove222"
        nr="38"
      />
      <Led
        key="LED Chainable Grove"
        name="Łańcuch LED"
        actuator="ledchainablegrove"
        dataBaseName="ledchainablegrove"
        nr="38"
      />
      <Fan key="Fan" name="Wentylator" reqNumber="" />
      <Buzzer />
    </div>
  );
};

export default ActuatorsContainer;
