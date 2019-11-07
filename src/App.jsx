import React, { useState } from "react";
import styled from "styled-components";

import ChartArea from "./components/ChartGame/ChartArea";
import GuessingArea from "./components/ChartGame/GuessingArea";

import games, { selectRandomGame } from "./games";
const [gameKey, gameDetails] = selectRandomGame(games);

const GameContainer = styled.section`
  max-width: 1024px;
  margin: 0 auto;
`;

const StyledMain = styled.main`
  width: 100vw;
  min-height: 100vh;
  padding: 0 0.5em;
  color: ${props => props.theme.black};
  background-color: ${props => props.theme.primaryColor};
  &.gameOver {
    background-color: #fff;
  }
  transition: background-color: 0.1s ease-in-out;
`;

const H1 = styled.h1`
  font-family: "Playfair Display", serif;
  font-weight: 900;
  font-style: italic;
  font-size: 3rem;
  margin: 0;
`;

function App() {
  const [outcome, setOutcome] = useState([true, false]);
  const [pending, correct] = outcome;

  return (
    <StyledMain className={!pending && "gameOver"}>
      <header style={{ textAlign: "center", padding: "1.5em 0" }}>
        <H1>Page Title!</H1>
        <small>Guess the search trend in the chart below.</small>
      </header>
      <GameContainer>
        <ChartArea
          filename={gameKey}
          dateColumn={gameDetails.dateColumn}
          columns={gameDetails.columns}
        />
        <GuessingArea
          gameDetails={gameDetails}
          outcome={outcome}
          setOutcome={setOutcome}
        />
      </GameContainer>
    </StyledMain>
  );
}

export default App;
