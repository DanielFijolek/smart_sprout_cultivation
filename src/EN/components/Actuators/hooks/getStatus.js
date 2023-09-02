import React, { useState, useEffect } from "react";
import { fetchStatus } from "../../../../api/actuators";

export const GetActuatorColor = (actuator) => {
  const [actuatorColor, setActuatorColor] = useState([]);

  useEffect(async () => {
    const actuatorStatus = await fetchStatus(actuator);
    setActuatorColor(actuatorStatus.RGB);
  }, []);

  return [actuatorColor, setActuatorColor];
};

export const GetStatus = (actuator) => {
  const [Status, setStatus] = useState([]);

  useEffect(async () => {
    const actuatorStatus = await fetchStatus(actuator);
    setStatus(actuatorStatus.status);
  }, []);

  return [Status, setStatus];
};

export const GetStatusRelay2 = (actuator) => {
  const [Status, setStatus] = useState([]);

  useEffect(async () => {
    const actuatorStatus = await fetchStatus(actuator);
    setStatus(actuatorStatus);
  }, []);

  return [Status, setStatus];
};
