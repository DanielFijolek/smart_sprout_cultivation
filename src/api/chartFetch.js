import db from "../Firebase";

export const fetchChartData = async (sensorId, startTime, endTime) => {
  console.log(startTime);
  const response = db
    .collection("sensors")
    .doc(sensorId)
    .collection(sensorId)
    .where("time", ">", startTime)
    .where("time", "<", endTime)
    .orderBy("time", "asc");

  const data = await response.get();
  console.log(data);
  return data.docs.map((item) => item.data());
};
