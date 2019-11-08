import React, { useState } from "react";

import useScore from "./utilities/useScore.js";
import GameHeader from "./components/ChartGame/GameHeader";
import ChartArea from "./components/ChartGame/ChartArea";
import GuessingArea from "./components/ChartGame/GuessingArea";
import {
  GameContainer,
  StyledMain,
  SolutionBox,
  SolutionText,
  SmallBottomText,
  GlobalStyle
} from "./components/ChartGame/StyledComponents.js";

import games, { selectRandomGame } from "./games";
const [gameKey, gameDetails] = selectRandomGame(games);

function App() {
  const [score, dispatchScore] = useScore();
  const [outcome, setOutcome] = useState([true, false]);
  const [pending, success] = outcome;
  const { hints, solutions, columns, dateColumn } = gameDetails;

  return (
    <>
      <GlobalStyle gameOver={!pending} />
      <StyledMain>
        <GameContainer>
          <GameHeader
            total={score.total}
            points={score.points}
            correct={score.correct}
            clearScore={() => {
              dispatchScore({ type: "clear" });
            }}
          />
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
    </>
  );
}

export default App;
