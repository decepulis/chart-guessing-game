import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

import useAxios from "axios-hooks";
import csv from "papaparse";

import { LineChart, Line } from "recharts";

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
        transform(value, columnName) {
          if (columnName === dateColumn) {
            return new Date(value);
          } else {
            return parseFloat(value.replace("<", ""));
          }
        },
        complete(results, _) {
          setGraphData(results.data);
        }
      });
    }
  }, [data, loading, dateColumn]);

  return (
    <LineChart width={600} height={300} data={graphData}>
      {columns.map(column => {
        return <Line key={column} dataKey={column} />;
      })}
    </LineChart>
  );
}

ChartArea.propTypes = {
  filename: PropTypes.string.isRequired,
  dateColumn: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired
};
