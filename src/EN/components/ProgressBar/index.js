import React from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";

const TwoLevelPieChart = ({ dataPromp, treshold, dataDummy, unit }) => {
  let data = [
    { name: "Light", value: 1000 },
    { name: "Total", value: 50 },
  ];
  data[0] = dataPromp;

  data[1].value = dataDummy[0].value - data[0].value;

  if (data[1].value < 0) {
    data[1].value = 0;
  }

  let COLORS = ["#4bf490", "#434f64"];

  if (data[0].value < treshold.low) {
    COLORS = ["#fcfcfc", "#434f64"];
  } else if (data[0].value < treshold.medium) {
    COLORS = ["#faea05", "#434f64"];
  } else {
    COLORS = ["#e60b0b", "#434f64"];
  }

  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
    } = props;
    return (
      <g>
        <text
          className="text-value"
          x={cx}
          y={cy - 20}
          dy={8}
          textAnchor="middle"
          fill={fill}
        >
          {payload.value}
        </text>
        <text
          className="text-name"
          x={cx}
          y={cy + 10}
          dy={5}
          textAnchor="middle"
          fill="#A3A3A3"
        >
          {payload.name}
        </text>
        <a xlinkHref="foo.html">
          <text
            x={cx}
            y={cy + 33}
            dy={5}
            className="text-value1"
            textAnchor="middle"
            fill="#A3A3A3"
          >
            {unit}
          </text>
        </a>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          cornerRadius={50}
          stroke="none"
        />

        <marker
          id="dot"
          viewBox="0 0 30 30"
          refX="15"
          refY="15"
          markerWidth="30"
          markerHeight="30"
        >
          <path
            d="M 90.7842689247671,161.7157310752329Z"
            fill="none"
            stroke="1"
            strokeWidth="1"
            id="markerPath"
            markerEnd="url(#dot)"
          >
            <animateMotion dur="2s" repeatCount="definite" fill="freeze">
              <mpath xlinkHref="#markerPath" />
            </animateMotion>
          </path>
        </marker>
        <path
          d="M 90.7842689247671,161.7157310752329Z"
          fill="none"
          stroke="1"
          strokeWidth="1"
          id="markerPath"
          markerEnd="url(#dot)"
        ></path>
      </g>
    );
  };

  return (
    <div style={{ width: "282px" }}>
      <ResponsiveContainer aspect={2} maxHeight="141px">
        <PieChart>
          <Pie
            data={dataDummy}
            dataKey="value"
            startAngle={225}
            endAngle={-45}
            innerRadius="80%"
            outerRadius="100%"
            fill="#434f64"
            cornerRadius={50}
            stroke="none"
          ></Pie>
          <Pie
            activeIndex={0}
            activeShape={renderActiveShape}
            data={data}
            startAngle={225}
            endAngle={-45}
            innerRadius="80%"
            outerRadius="100%"
            fill="none"
            cornerRadius={50}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TwoLevelPieChart;
