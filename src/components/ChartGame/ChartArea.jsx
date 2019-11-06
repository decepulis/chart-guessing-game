import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

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

export default function ChartArea({ filename, dateColumn, columns }) {
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
        {columns.map(column => {
          return (
            <Line key={column} dataKey={column} dot={false} strokeWidth={3} />
          );
        })}
        <XAxis dataKey={dateColumn} angle={-30} dy={15} dx={-5} height={50} />
        <YAxis />
        <Tooltip
          animation={500}
          formatter={(value, _) => [value]}
          labelStyle={{ color: "#000", fontWeight: "bold" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

ChartArea.propTypes = {
  filename: PropTypes.string.isRequired,
  dateColumn: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired
};
