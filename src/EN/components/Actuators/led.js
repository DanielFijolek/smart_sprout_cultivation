import React, { useState } from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";
import { GetActuatorColor, GetStatus } from "./hooks/getStatus";
import db from "../../../Firebase";

const Led60 = ({ name, actuator, dataBaseName, nr }) => {
  const [color, setColor] = GetActuatorColor(dataBaseName);
  const [tempColor, setTempColor] = GetActuatorColor(dataBaseName);
  const [state, setState] = useState(false);
  const [status, setStatus] = GetStatus(actuator);
  const [submitColor, setSubmitColor] = useState("#fff");
  const [cancelColor, setCancelColor] = useState("#fff");

  async function reqSwitchOn() {
    try {
      const req = await fetch(
        `http://10.8.0.${nr}:5000/api/${actuator}/start?r=${color.r}&g=${color.g}&b=${color.b}`
      );
      if (color !== undefined && status !== undefined) {
        db.collection("actuator")
          .doc(dataBaseName)
          .set({ RGB: color, status: "ON" });
      }
      setStatus("ON");
    } catch (error) {
      console.error(error);
    }
  }
  async function reqSwitchOff() {
    try {
      const req = await fetch(`http://10.8.0.${nr}:5000/api/${actuator}/stop`);
      if (color !== undefined && status !== undefined) {
        db.collection("actuator")
          .doc(dataBaseName)
          .set({ RGB: color, status: "OFF" });
      }
      setStatus("OFF");
    } catch (error) {
      console.error(error);
    }
  }

  const handleClick = () => {
    setState(!state);
  };

  const handleClose = () => {
    setState(false);
  };

  const styles = reactCSS({
    default: {
      swatch: {
        display: "flex",
        alignSelf: "center",
        padding: "5px",
        borderRadius: "1px",
        cursor: "pointer",
        width: "50px",
        height: "25px",
        marginTop: "0px",
        marginBot: "10px",
        background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
      },
      popover: {
        position: "absolute",
        zIndex: "2",
        background: "#fff",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
      submitButton: {
        background: `${submitColor}`,
        color: "#000",
        width: "50%",
        borderRadius: "0",
      },
      cancelButton: {
        background: `${cancelColor}`,
        color: "#000",
        width: "50%",
        borderRadius: "0",
      },
    },
  });

  const handleChange = async (color) => {
    setTempColor(color.rgb);
  };

  const cancel = () => {
    setSubmitColor("#fff");
    setCancelColor("#fff");
    setTempColor(color);
    handleClose();
  };

  const submit = async () => {
    setSubmitColor("#fff");
    setCancelColor("#fff");
    setColor(tempColor);
    if (color !== undefined && status !== undefined) {
      db.collection("actuator")
        .doc(dataBaseName)
        .set({ RGB: color, status: status });
    }
    if (status === "ON") {
      await reqSwitchOn();
    }
    handleClose();
  };

  return (
    <div className="Actuator">
      <div className="sensorName">{name}</div>
      <div className="status statusLed60" id={status}>
        {status}
      </div>
      <div style={styles.swatch} onClick={handleClick} />
      {state ? (
        <div style={styles.popover}>
          {/* <div style={styles.cover} onClick={handleClose} /> */}
          <SketchPicker
            color={tempColor}
            onChange={handleChange}
            disableAlpha={true}
          />

          <button
            style={styles.submitButton}
            onClick={submit}
            onMouseEnter={() => setSubmitColor("#619aef")}
            onMouseLeave={() => setSubmitColor("#fff")}
          >
            {" "}
            Submit
          </button>
          <button
            style={styles.cancelButton}
            onClick={cancel}
            onMouseEnter={() => setCancelColor("#619aef")}
            onMouseLeave={() => setCancelColor("#fff")}
          >
            {" "}
            Cancel
          </button>
        </div>
      ) : null}
      <div className="buttons">
        <button
          onClick={() => {
            reqSwitchOn();
          }}
        >
          Turn ON
        </button>
        <button
          onClick={() => {
            reqSwitchOff();
          }}
        >
          Turn OFF
        </button>
      </div>
    </div>
  );
};

export default Led60;
