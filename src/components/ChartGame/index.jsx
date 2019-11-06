import React from "react";
import styled from "styled-components";
import games, { selectRandomGame } from "./games";
import ChartArea from "./ChartArea";
const [gameKey, gameDetails] = selectRandomGame(games);

const ChartContainer = styled.section`
  max-width: 1024px;
  margin: 0 auto;
  padding: 1.5rem;
  background: #ffffff;
  border: 4px solid ${props => props.theme.black};
`;

export default function ChartGame() {
  return (
    <>
      <ChartContainer>
        <ChartArea
          filename={gameKey}
          dateColumn={gameDetails.dateColumn}
          columns={gameDetails.columns}
        />
      </ChartContainer>
    </>
  );
}
