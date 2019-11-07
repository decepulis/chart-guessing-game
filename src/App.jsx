import React, { useState, useReducer } from "react";
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

const initialScore = {
  points: 0,
  total: 0,
  correct: 0
};

const setScore = (state, action) => {
  switch (action.type) {
    case "correct":
      return {
        ...state,
        points: (state.points += action.points),
        total: (state.total += 1),
        correct: (state.correct += 1)
      };
    case "incorrect":
      return {
        ...state,
        total: (state.total += 1)
      };
    default:
      return state;
  }
};

function App() {
  const [score, dispatchScore] = useReducer(setScore, initialScore);

  const [outcome, setOutcome] = useState([true, false]);
  const [pending] = outcome;

  return (
    <StyledMain className={!pending && "gameOver"}>
      <GameContainer>
        <header style={{ textAlign: "center", padding: "1.5em 0" }}>
          <H1>Page Title!</H1>
          <p style={{ margin: 0 }}>
            <small>Guess the search trend in the chart below.</small>
          </p>
          {score.total > 0 && (
            <p style={{ margin: 0 }}>
              <small>
                {score.points}|
                {((100 * score.correct) / score.total).toFixed(2)}%
              </small>
            </p>
          )}
        </header>
        <ChartArea
          filename={gameKey}
          dateColumn={gameDetails.dateColumn}
          columns={gameDetails.columns}
        />
        <GuessingArea
          gameDetails={gameDetails}
          outcome={outcome}
          setOutcome={setOutcome}
          dispatchScore={dispatchScore}
        />
      </GameContainer>
    </StyledMain>
  );
}

export default App;
