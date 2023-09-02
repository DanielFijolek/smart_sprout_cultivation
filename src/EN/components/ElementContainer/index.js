import React, { useState, useEffect } from "react";
import SensorElement from "../sesnorElement";
import { fetchSensorData } from "../../../api/sensors";

import useSensorsId from "./hooks/useSensorsId";

const ElementContainer = () => {
  const [sensors, setSensors] = useState([]);
  const [sensorsId] = useSensorsId();

  useEffect(async () => {
    let sensorsData = [];
    await Promise.all(
      sensorsId.map(async (sensorId) => {
        const sensorData = await fetchSensorData(sensorId);

        sensorsData = [...sensorsData, ...sensorData];
      })
    );

    sensorsData.forEach((e) => {
      if (e.id === "Moisture" || e.id === "TempMCP" || e.id === "Water") {
        const index = sensorsData.indexOf(e);
        if (index > -1) {
          sensorsData.splice(index, 1);
        }
      }
    });

    setSensors(sensorsData);
  }, [sensorsId]);

  useEffect(async () => {
    const interval = await setInterval(async () => {
      let sensorsData = [];
      await Promise.all(
        sensorsId.map(async (sensorId) => {
          const sensorData = await fetchSensorData(sensorId);

          sensorsData = [...sensorsData, ...sensorData];
        })
      );

      sensorsData.forEach((e) => {
        if (e.id === "Moisture" || e.id === "TempMCP" || e.id === "Water") {
          const index = sensorsData.indexOf(e);
          if (index > -1) {
            sensorsData.splice(index, 1);
          }
        }
      });

      setSensors(sensorsData);
    }, 900000);
    return () => clearInterval(interval);
  }, [sensorsId]);

  return (
    <div className="ElementContainer">
      {sensors.map((v) => (
        <SensorElement key={v.id} name={v.id} data={v.data} />
      ))}
    </div>
  );
};

export default ElementContainer;
