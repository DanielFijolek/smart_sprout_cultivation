import React from "react";
import TwoLevelPieChart from "../ProgressBar";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const ElementContainer = ({ data, name }) => {
  let timeData = [];
  let dataEntries = Object.entries(data).sort();
  const dataCharts = [];

  dataEntries.forEach((element) => {
    if (element[0] === "time") {
      element[0] = "Last update:";
      let t = new Date(element[1] * 1000);
      const data = `${t.toLocaleDateString("en-GB", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })} ${t.toLocaleTimeString("en-GB")}`;

      element[1] = data;
      const index = dataEntries.indexOf(element);

      timeData = element;
      if (index > -1) {
        dataEntries.splice(index, 1);
      }
    }
  });

  if (name === "Light") {
    dataCharts.push(
      <TwoLevelPieChart
        key={name}
        dataPromp={{ name: name, value: dataEntries[0][1] }}
        treshold={{ low: 500, medium: 800 }}
        dataDummy={[{ name: "", value: 1000 }]}
        unit=""
      />
    );
    dataEntries = [];
  } else if (name === "Moisture") {
    dataCharts.push(
      <TwoLevelPieChart
        key={name}
        dataPromp={{ name: name, value: dataEntries[1][1] }}
        treshold={{ low: 1500, medium: 1950 }}
        dataDummy={[{ name: "", value: 2100 }]}
        unit={dataEntries[0][1]}
      />
    );
    dataEntries = [];
  } else if (name === "Water") {
    dataCharts.push(
      <TwoLevelPieChart
        key={name}
        dataPromp={{ name: name, value: dataEntries[1][1] }}
        treshold={{ low: 600, medium: 800 }}
        dataDummy={[{ name: "", value: 1000 }]}
        unit={dataEntries[0][1]}
      />
    );
    dataEntries = [];
  } else if (name === "TempMCP") {
    dataCharts.push(
      <TwoLevelPieChart
        key={name}
        dataPromp={{ name: "Temperature", value: dataEntries[0][1] }}
        treshold={{ low: 25, medium: 35 }}
        dataDummy={[{ name: "", value: 60 }]}
        unit="[°C]"
      />
    );
    dataEntries = [];
  } else if (name === "Sound") {
    dataCharts.push(
      <TwoLevelPieChart
        key={name}
        dataPromp={{ name: name, value: dataEntries[0][1] }}
        treshold={{ low: 10, medium: 25 }}
        dataDummy={[{ name: "", value: 50 }]}
        unit=""
      />
    );
    dataEntries = [];
  } else if (name === "Weight") {
    dataCharts.push(
      <TwoLevelPieChart
        key={name}
        dataPromp={{
          name: name,
          value: parseFloat(dataEntries[0][1].toFixed(1)),
        }}
        treshold={{ low: 600, medium: 1000 }}
        dataDummy={[{ name: "", value: 2000 }]}
        unit=""
      />
    );
    dataEntries = [];
  } else if (name === "Vibration") {
    dataCharts.push(
      <TwoLevelPieChart
        key={name}
        dataPromp={{
          name: name,
          value: parseFloat(dataEntries[0][1].toFixed(1)),
        }}
        treshold={{ low: 0.3, medium: 0.6 }}
        dataDummy={[{ name: "", value: 1 }]}
        unit=""
      />
    );
    dataEntries = [];
  } else if (name === "WaterIduino") {
    if (dataEntries[1][1] === "dry") {
      dataEntries[1][1] = "Low";
    } else if (dataEntries[1][1] === "moist") {
      dataEntries[1][1] = "Medium";
    } else if (dataEntries[1][1] === "wet") {
      dataEntries[1][1] = "High";
    }
    name = "Water level A";
    dataCharts.push(
      <div className="progresBar">
        <TwoLevelPieChart
          key={name}
          dataPromp={{ name: "Water level", value: dataEntries[0][1] }}
          treshold={{ low: 400, medium: 1100 }}
          dataDummy={[{ name: "", value: 1700 }]}
          unit={capitalizeFirstLetter(dataEntries[1][1])}
        />
      </div>
    );
    dataEntries = [];
  } else if (name === "WaterIduino2") {
    if (dataEntries[1][1] === "dry") {
      dataEntries[1][1] = "Low";
    } else if (dataEntries[1][1] === "moist") {
      dataEntries[1][1] = "Medium";
    } else if (dataEntries[1][1] === "wet") {
      dataEntries[1][1] = "High";
    }
    name = "Water level B";
    dataCharts.push(
      <div className="progresBar">
        <TwoLevelPieChart
          key={name}
          dataPromp={{ name: "Water level", value: dataEntries[0][1] }}
          treshold={{ low: 400, medium: 1100 }}
          dataDummy={[{ name: "", value: 1700 }]}
          unit={capitalizeFirstLetter(dataEntries[1][1])}
        />
      </div>
    );
    dataEntries = [];
  } else if (name === "CO2Grove") {
    name = "Air";
    dataCharts.push(
      <div className="progresBar">
        <TwoLevelPieChart
          key={`${name}CO2`}
          dataPromp={{ name: "CO2", value: dataEntries[0][1] }}
          treshold={{ low: 1000, medium: 5000 }}
          dataDummy={[{ name: "", value: 60000 }]}
          unit=""
        />
      </div>
    );
    dataCharts.push(
      <div className="progresBar">
        <TwoLevelPieChart
          key={`${name}TVOC`}
          dataPromp={{ name: "TVOC", value: dataEntries[1][1] }}
          treshold={{ low: 1000, medium: 5000 }}
          dataDummy={[{ name: "", value: 60000 }]}
          unit=""
        />
      </div>
    );
    dataEntries = [];
  } else if (name === "DHT22") {
    name = "Temp. and humidity";
    dataCharts.push(
      <div className="progresBar">
        <TwoLevelPieChart
          key={`${name}Humidity`}
          dataPromp={{
            name: "Humidity",
            value: parseFloat(dataEntries[0][1].toFixed(1)),
          }}
          treshold={{ low: 35, medium: 70 }}
          dataDummy={[{ name: "", value: 100 }]}
          unit=""
        />
      </div>
    );
    dataCharts.push(
      <div className="progresBar">
        <TwoLevelPieChart
          key={`${name}Temperature`}
          dataPromp={{
            name: "Temperature",
            value: parseFloat(dataEntries[1][1].toFixed(1)),
          }}
          treshold={{ low: 40, medium: 70 }}
          dataDummy={[{ name: "", value: 100 }]}
          unit="[°C]"
        />
      </div>
    );
    dataEntries = [];
  } else if (name === "Sunlight") {
    dataCharts.push(
      <div className="progresBar">
        <TwoLevelPieChart
          key={`${name}IR`}
          dataPromp={{ name: "IR", value: dataEntries[0][1] }}
          treshold={{ low: 100, medium: 200 }}
          dataDummy={[{ name: "", value: 300 }]}
          unit=""
        />
      </div>
    );
    dataCharts.push(
      <div className="progresBar">
        <TwoLevelPieChart
          key={`${name}UV`}
          dataPromp={{ name: "UV", value: dataEntries[1][1] }}
          treshold={{ low: 2.9, medium: 7.9 }}
          dataDummy={[{ name: "", value: 12 }]}
          unit=""
        />
      </div>
    );
    dataCharts.push(
      <div className="progresBar">
        <TwoLevelPieChart
          key={`${name}Visible`}
          dataPromp={{ name: "Visible", value: dataEntries[2][1] }}
          treshold={{ low: 1000, medium: 3000 }}
          dataDummy={[{ name: "", value: 6000 }]}
          unit=""
        />
      </div>
    );
    dataEntries = [];
  } else if (name === "Motion") {
    dataEntries = [];
    timeData[0] = "Last detected:";
  }
  return (
    <div className="sensorElement">
      <div className="sensorName">{name}</div>
      <div className="progresBarContainer">{dataCharts}</div>
      {dataEntries.map((item) => (
        <div className="valueContainer">
          <label style={{ paddingLeft: "5px" }}>{item[0]}:</label>
          <div className="value">{item[1]}</div>
        </div>
      ))}
      {
        <div className="timeContainer">
          <label style={{ marginRight: "10px" }}>{timeData[0]}</label>
          <div className="time">{timeData[1]}</div>
        </div>
      }
    </div>
  );
};

export default ElementContainer;
