import React, { useState } from "react";

import useScore from "./utilities/useScore.js";
import ChartArea from "./components/ChartGame/ChartArea";
import GuessingArea from "./components/ChartGame/GuessingArea";
import {
  GameContainer,
  StyledMain,
  H1,
  SolutionBox,
  SolutionText,
  SmallBottomText
} from "./components/ChartGame/StyledComponents.js";

import games, { selectRandomGame } from "./games";
const [gameKey, gameDetails] = selectRandomGame(games);

const initialScore = {
  points: 0,
  total: 0,
  correct: 0
};

function App() {
  const [score, dispatchScore] = useScore(initialScore);
  const [outcome, setOutcome] = useState([true, false]);
  const [pending, success] = outcome;
  const { hints, solutions, columns, dateColumn } = gameDetails;

  return (
    <StyledMain className={!pending && "gameOver"}>
      <GameContainer>
        <header style={{ textAlign: "center", padding: "1.5em 0" }}>
          <H1>Page Title!</H1>
          <p style={{ margin: 0 }}>
            <small>Guess the search trend in the chart below.</small>
          </p>
          <p style={{ margin: 0 }}>
            {score.total > 0 ? (
              <small>
                {score.points}|
                {((100 * score.correct) / score.total).toFixed(2)}%
              </small>
            ) : (
              <small>&nbsp;</small>
            )}
          </p>
        </header>
        <ChartArea
          filename={gameKey}
          dateColumn={dateColumn}
          columns={columns}
        />
        <GuessingArea
          hints={hints}
          solutions={solutions}
          setOutcome={setOutcome}
          dispatchScore={dispatchScore}
        />
        <SolutionBox
          className={!pending && "visible"}
          success={success}
          onClick={() => {
            window.location.reload();
          }}
        >
          <SolutionText>{solutions[0]}</SolutionText>
          <SmallBottomText>click to continue</SmallBottomText>
        </SolutionBox>
      </GameContainer>
    </StyledMain>
  );
}

export default App;
