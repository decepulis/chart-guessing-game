import React, { useEffect, useState, useContext } from "react";

import PropTypes from "prop-types";

import styled, { ThemeContext } from "styled-components";

import useAxios from "axios-hooks";
import csv from "papaparse";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const DATA_PATH = "/data";

const TooltipBody = styled.div`
  background: #fff;
  border: 2px solid ${props => props.theme.black};
  padding: 0 1em;
`;
const Square = styled.div`
  display: inline-block;
  position: relative;
  width: 1rem;
  height: 1rem;
  bottom: -0.125rem;
  background: ${props => (props.background ? props.background : "black")};
`;
const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <TooltipBody>
        <div style={{ margin: "0.25em 0" }}>
          <b>{label}</b>
        </div>
        {payload.map(series => (
          <div key={series.dataKey} style={{ margin: "0.25em 0" }}>
            <Square background={series.stroke} /> {series.value}
          </div>
        ))}
      </TooltipBody>
    );
  }

  return null;
};

export default function ChartArea({ filename, dateColumn, columns }) {
  const theme = useContext(ThemeContext);
  const [graphData, setGraphData] = useState([]);
  const [{ data, loading, error }] = useAxios(`${DATA_PATH}/${filename}.csv`);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (!loading) {
      csv.parse(data, {
        header: true,
        skipEmptyLines: true,
        transform: (value, columnName) =>
          columnName !== dateColumn
            ? parseFloat(value.replace("<", ""))
            : value,
        complete: (results, _) => setGraphData(results.data)
      });
    }
  }, [data, loading, dateColumn]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart width={600} height={300} data={graphData}>
        {columns.map((column, idx) => (
          <Line
            key={column}
            dataKey={column}
            dot={false}
            strokeWidth={4}
            stroke={idx === 0 ? theme.secondaryColor : theme.tertiaryColor}
            type="monotone"
          />
        ))}
        <XAxis
          dataKey={dateColumn}
          stroke={theme.gray}
          angle={-30}
          dy={15}
          dx={-5}
          height={50}
        />
        <YAxis stroke={theme.gray} width={30} />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
}

ChartArea.propTypes = {
  filename: PropTypes.string.isRequired,
  dateColumn: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired
};
