import React, { useEffect, useState } from "react";
import "./App.css";

import games, { selectRandomGame } from "./games";

import useAxios from "axios-hooks";
import csv from "papaparse";
import { LineChart, Line } from "recharts";

const [gameKey, gameDetails] = selectRandomGame(games);

function App() {
  const [graphData, setGraphData] = useState([]);
  const [{ data, loading }] = useAxios(`./data/${gameKey}.csv`);

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
          setGraphData(results.data);
        }
      });
    }
  }, [data, loading]);

  return (
    <>
      <header>
        <h1>Page Title!</h1>
      </header>
      <main>
        {!loading && (
          <LineChart width={600} height={300} data={graphData}>
            {gameDetails.columns.map(column => {
              return <Line key={column} dataKey={column} />;
            })}
          </LineChart>
        )}
      </main>
    </>
  );
}

export default App;
