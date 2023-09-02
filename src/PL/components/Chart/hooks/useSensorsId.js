import React, { useState, useEffect } from "react";
import { fetchSensors } from "../../../../api/sensors";

const useSensorsId = () => {
  const [sensorsId, setSensorsId] = useState([]);

  useEffect(async () => {
    const sensorsId = await fetchSensors();
    setSensorsId(sensorsId);
  }, []);

  return [sensorsId, setSensorsId];
};

export default useSensorsId;
