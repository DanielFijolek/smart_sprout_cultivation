import db from "../Firebase";

export const fetchSensors = async () => {
  const response = db.collection("sensors");
  const data = await response.get();
  return data.docs.map((item) => item.id);
};

export const fetchSensorData = async (sensorId) => {
  const response = db
    .collection("sensors")
    .doc(sensorId)
    .collection(sensorId)
    .orderBy("time", "desc")
    .limit(1);

  const data = await response.get();

  return data.docs.map((item) => ({ id: sensorId, data: item.data() }));
};
