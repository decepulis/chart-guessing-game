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

const ChartContainer = styled.section`
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  background: #ffffff;
  border: 4px solid ${props => props.theme.black};
`;

export default function ChartGame() {
  return (
    <GameContainer>
      <ChartContainer>
        <ChartArea
          filename={gameKey}
          dateColumn={gameDetails.dateColumn}
          columns={gameDetails.columns}
        />
      </ChartContainer>
      <GuessingArea gameDetails={gameDetails} />
    </GameContainer>
  );
}
