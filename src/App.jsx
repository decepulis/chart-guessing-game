import React, { useEffect, useState } from "react";
import "./App.css";

import useAxios from "axios-hooks";
import csv from "papaparse";
import { LineChart, Line } from "recharts";

function App() {
  const [graphData, setGraphData] = useState([]);
  const [{ data, loading, error }, refetch] = useAxios(
    "./data/trump-obama.csv"
  );

  useEffect(() => {
    if (!loading) {
      csv.parse(data, {
        header: true,
        skipEmptyLines: true,
        transformHeader(value) {
          return value.replace(": (Worldwide)", "");
        },
        transform(value, header) {
          if (header !== "Month") {
            return parseFloat(value.replace("<", ""));
          } else {
            return value;
          }
        },
        complete(results, _) {
          console.log(results);
          setGraphData(results.data);
        }
      });
    }
  }, [data, loading, error]);

  return (
    <>
      <header>
        <h1>Page Title!</h1>
      </header>
      <main>
        <LineChart width={600} height={300} data={graphData}>
          <Line type="monotone" stroke="red" dataKey="trump" />
          <Line type="monotone" stroke="blue" dataKey="obama" />
        </LineChart>
      </main>
    </>
  );
}

export default App;
