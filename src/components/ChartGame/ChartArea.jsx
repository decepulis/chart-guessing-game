import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";

import { ThemeContext } from "styled-components";

import parse from "date-fns/parse";
import format from "date-fns/format";

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
import { ChartContainer, CustomTooltip } from "./ChartArea.module";

const DATA_PATH = "/data";
const CHART_HEIGHT = 350;

export default function ChartArea({ filename, dateColumn, columns }) {
  const theme = useContext(ThemeContext);
  const [graphData, setGraphData] = useState([]);
  const [{ data, loading, error }] = useAxios(`${DATA_PATH}/${filename}.csv`);

  useEffect(() => {
    error && console.error(error);
  }, [error]);

  useEffect(() => {
    if (!loading) {
      csv.parse(data, {
        header: true,
        skipEmptyLines: true,
        transform: (value, columnName) =>
          columnName === dateColumn
            ? format(parse(value, "yyyy-MM", new Date()), "LLL yyyy")
            : parseInt(value.replace("<", "")),
        complete: (results, _) => setGraphData(results.data)
      });
    }
  }, [data, loading, dateColumn]);

  return (
    <ChartContainer>
      {graphData.length === 0 ? (
        <div style={{ height: `${CHART_HEIGHT}px` }}></div>
      ) : (
        <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
          <LineChart data={graphData}>
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
      )}
      <p style={{ marginBottom: 0, color: theme.gray }}>
        <small>
          Data source:{" "}
          <a
            href="https://www.google.com/trends"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: theme.gray }}
          >
            Google Trends
          </a>
        </small>
      </p>
    </ChartContainer>
  );
}

ChartArea.propTypes = {
  filename: PropTypes.string.isRequired,
  dateColumn: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired
};
