import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import useSensorsId from "./hooks/useSensorsId";
import { fetchChartData } from "../../../api/chartFetch";

const Chart = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );
  const [checked, setChecked] = useState("CO2Grove");
  const [id, setID] = useSensorsId();
  const [startTimestamp, setStartTimestamp] = useState(null);
  const [endTimestamp, setEndTimestamp] = useState(null);
  const [data, setData] = useState(null);
  const [lineLabel, setLineLabel] = useState(null);

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    //ustawia początkową date jako wczorajszą
    let date = new Date();

    date.setHours(date.getHours() - 2);

    setStartDate(date);
  }, []);

  useEffect(() => {
    //usuwa nie potrzebne sensory z listy
    let idlist = id;

    idlist.forEach((e) => {
      if (e === "Moisture" || e === "TempMCP" || e === "Water" || e === "CO2") {
        const index = idlist.indexOf(e);
        if (index > -1) {
          idlist.splice(index, 1);
        }
      }
    });

    setID(idlist);
  }, [id]);

  function setName(id) {
    if (id === "WaterIduino") {
      return "Water level A";
    } else if (id === "WaterIduino2") {
      return "Water level B";
    } else if (id === "DHT22") {
      return "Temp. and humidity";
    } else if (id === "CO2Grove") {
      return "Air";
    } else {
      return id;
    }
  }
  useEffect(() => {
    // oblicza timestamp gdy data początkowa zostanie zmieniona
    if (startDate) {
      const date = startDate;
      const timestamp = date;
      const timestampSec = Math.floor(timestamp / 1000);
      setStartTimestamp(timestampSec);
    }
  }, [startDate]);

  useEffect(() => {
    // oblicza timestamp gdy data końcowa zostanie zmieniona
    if (endDate) {
      const date = endDate;
      const timestamp = date;
      const timestampSec = Math.floor(timestamp / 1000);
      setEndTimestamp(timestampSec);
    }
  }, [endDate]);

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(async () => {
    if (startTimestamp < endTimestamp) {
      let chartData = await fetchChartData(
        checked,
        startTimestamp,
        endTimestamp
      );
      console.log(chartData);
      chartData.forEach((element) => {
        let t = new Date(element.time * 1000);
        const dateString = `${t.toLocaleDateString("en-GB", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })} ${t.toLocaleTimeString("en-GB")}`;
        element.time = dateString;
      });
      if (
        chartData !== null &&
        chartData !== undefined &&
        chartData.length > 0
      ) {
        setData(chartData);
        const lineDataArray = [];
        const dataArray = Object.entries(chartData[0]);

        dataArray.forEach((element) => {
          if (element[0] !== "time") {
            lineDataArray.push(element[0]);
          }
        });

        setLineLabel(
          lineDataArray.map((element) => (
            <Line
              type="linear"
              dataKey={element}
              stroke={
                "#" +
                Math.floor(getRandomIntInclusive(5000000, 16777215)).toString(
                  16
                )
              }
              dot={false}
              activeDot={{ strokeWidth: 2, r: 5 }}
              strokeWidth={2}
            />
          ))
        );
      }
    }
  }, [startTimestamp, endTimestamp, checked]);

  return (
    <div className="Chart">
      <div className="TopMenu">
        <Link className="button" to="/EN">
          <button className="button">Sensors</button>
        </Link>
        <Link className="button" to="/EN/actuators">
          <button className="button">Actuators</button>
        </Link>
        <Link className="button buttonActive" to="/EN/chart">
          <button className="button" onClick={refreshPage}>
            Graph
          </button>
        </Link>
      </div>
      <div className="Container">
        <div className="filters">
          <>
            <div>Start Date:</div>
            {/* <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            /> */}
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              excludeTimes={[
                setHours(setMinutes(new Date(), 0), 17),
                setHours(setMinutes(new Date(), 30), 18),
                setHours(setMinutes(new Date(), 30), 19),
                setHours(setMinutes(new Date(), 30), 17),
              ]}
              dateFormat="d MM, yyyy HH:mm"
              timeFormat="HH:mm"
            />
            <div>End date:</div>

            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              excludeTimes={[
                setHours(setMinutes(new Date(), 0), 17),
                setHours(setMinutes(new Date(), 30), 18),
                setHours(setMinutes(new Date(), 30), 19),
                setHours(setMinutes(new Date(), 30), 17),
              ]}
              dateFormat="d MM, yyyy H:mm"
              timeFormat="HH:mm"
            />
          </>
          {id.map((item) => (
            <div key={item} className="checkList">
              <label className="labelCheckbox">{setName(item)}</label>
              <input
                type="checkbox"
                id={item}
                name={item}
                checked={checked === item}
                onChange={(e) => {
                  if (e.target.checked) {
                    setChecked(item);
                  }
                }}
              />
            </div>
          ))}
        </div>
        <LineChart
          width={800}
          height={700}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          data={data}
          background-color="|black"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" stroke="#fff" tick={{ fill: "white" }} />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Legend />
          {lineLabel}
        </LineChart>
      </div>
    </div>
  );
};

export default Chart;
