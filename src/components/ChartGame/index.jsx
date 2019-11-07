import React from "react";
import styled from "styled-components";

import ChartArea from "./ChartArea";
import GuessingArea from "./GuessingArea";

import games, { selectRandomGame } from "./games";
const [gameKey, gameDetails] = selectRandomGame(games);

const GameContainer = styled.section`
  max-width: 1024px;
  margin: 0 auto;
`;

export default function ChartGame() {
  return (
    <GameContainer>
      <ChartArea
        filename={gameKey}
        dateColumn={gameDetails.dateColumn}
        columns={gameDetails.columns}
      />
      <GuessingArea gameDetails={gameDetails} />
    </GameContainer>
  );
}
