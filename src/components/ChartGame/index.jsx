import React from "react";

import games, { selectRandomGame } from "./games";
import ChartArea from "./ChartArea";
const [gameKey, gameDetails] = selectRandomGame(games);

export default function ChartGame() {
  return (
    <>
      <ChartArea
        filename={gameKey}
        dateColumn={gameDetails.dateColumn}
        columns={gameDetails.columns}
      />
    </>
  );
}
