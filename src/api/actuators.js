import db from "../Firebase";

export const fetchStatus = async (doc) => {
  const response = db.collection("actuator").doc(doc);
  const data = await response.get();
  return data.data();
};
