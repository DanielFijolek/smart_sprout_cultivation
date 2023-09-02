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
      element[0] = "Ostatnia aktualizacja:";
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
    name = "Oświetlenie";

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
    name = "Wilgotność";
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
    name = "Nawodnienie";
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
    name = "Temperatura";
    dataCharts.push(
      <TwoLevelPieChart
        key={name}
        dataPromp={{
          name: name,
          value: parseFloat(dataEntries[0][1].toFixed(1)),
        }}
        treshold={{ low: 25, medium: 35 }}
        dataDummy={[{ name: "", value: 60 }]}
        unit="[°C]"
      />
    );
    dataEntries = [];
  } else if (name === "Sound") {
    name = "Dźwięk";
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
    name = "Waga";
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
    name = "Wibracje";
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
    name = "Poziom wody A";
    if (dataEntries[1][1] === "dry") {
      dataEntries[1][1] = "Niski";
    } else if (dataEntries[1][1] === "moist") {
      dataEntries[1][1] = "Średni";
    } else if (dataEntries[1][1] === "wet") {
      dataEntries[1][1] = "Wysoki";
    }
    dataCharts.push(
      <div className="progresBar">
        <TwoLevelPieChart
          key={name}
          dataPromp={{ name: "Poziom wody", value: dataEntries[0][1] }}
          treshold={{ low: 400, medium: 1100 }}
          dataDummy={[{ name: "", value: 1700 }]}
          unit={capitalizeFirstLetter(dataEntries[1][1])}
        />
      </div>
    );
    dataEntries = [];
  } else if (name === "WaterIduino2") {
    name = "Poziom wody B";
    if (dataEntries[1][1] === "dry") {
      dataEntries[1][1] = "Niski";
    } else if (dataEntries[1][1] === "moist") {
      dataEntries[1][1] = "Średni";
    } else if (dataEntries[1][1] === "wet") {
      dataEntries[1][1] = "Wysoki";
    }
    dataCharts.push(
      <div className="progresBar">
        <TwoLevelPieChart
          key={name}
          dataPromp={{ name: "Poziom wody", value: dataEntries[0][1] }}
          treshold={{ low: 400, medium: 1100 }}
          dataDummy={[{ name: "", value: 1700 }]}
          unit={capitalizeFirstLetter(dataEntries[1][1])}
        />
      </div>
    );
    dataEntries = [];
  } else if (name === "CO2Grove") {
    name = "Powietrze";
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
    name = "Temp. i wilgotność";
    dataCharts.push(
      <div className="progresBar">
        <TwoLevelPieChart
          key={`${name}Humidity`}
          dataPromp={{
            name: "Wilgotność",
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
          key={`${name}Temperatura`}
          dataPromp={{
            name: "Temperatura",
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
    name = "Światło słoneczne";

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
          dataPromp={{ name: "Widoczność", value: dataEntries[2][1] }}
          treshold={{ low: 1000, medium: 3000 }}
          dataDummy={[{ name: "", value: 6000 }]}
          unit=""
        />
      </div>
    );
    dataEntries = [];
  } else if (name === "Motion") {
    name = "Ruch";
    dataEntries = [];
    timeData[0] = "Ostatnio wykryty:";
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
          <label style={{ fontSize: "13px", marginRight: "10px" }}>
            {timeData[0]}
          </label>
          <div style={{ fontSize: "13px" }} className="time">
            {timeData[1]}
          </div>
        </div>
      }
    </div>
  );
};

export default ElementContainer;
