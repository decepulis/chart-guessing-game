import React, { useState } from "react";
import PropTypes from "prop-types";
import stringSimilarity from "string-similarity";

import {
  SubmitRow,
  SubmitInput,
  SubmitButton,
  SolutionBox,
  SolutionText
} from "./GuessingArea.module";
import HintArea from "./HintArea";

const SUCCESS_THRESHOLD = 0.66;

const GuessingArea = ({ gameDetails, outcome, setOutcome, dispatchScore }) => {
  const { hints, solutions } = gameDetails;
  const [guess, setGuess] = useState("");
  const [pending, success] = outcome;

  const handleSubmit = e => {
    e.preventDefault();

    const similarity = stringSimilarity.findBestMatch(
      guess.toLowerCase(),
      gameDetails.solutions.map(solution => solution.toLowerCase())
    );
    const { rating } = similarity.bestMatch;

    if (rating > SUCCESS_THRESHOLD) {
      setOutcome([false, true]);
      dispatchScore({ type: "correct", points: 1 });
    } else {
      setOutcome([false, false]);
      dispatchScore({ type: "incorrect" });
    }
  };
  const handleChangeGuess = e => {
    setGuess(e.target.value);
  };
  return (
    <section style={{ paddingBottom: "1.5em" }}>
      <HintArea hints={hints} />
      <form onSubmit={handleSubmit}>
        <SubmitRow>
          <SubmitInput
            autoFocus
            placeholder="What search trend is this?"
            type="text"
            value={guess}
            onChange={handleChangeGuess}
          />
          <SubmitButton type="submit">
            {guess.length > 0 ? "Submit" : "Give Up"}
          </SubmitButton>
        </SubmitRow>
      </form>
      <SolutionBox
        className={!pending && "visible"}
        acceptsClicks={!pending}
        success={success}
        onClick={() => {
          window.location.reload();
        }}
      >
        <SolutionText>{solutions[0]}</SolutionText>
      </SolutionBox>
    </section>
  );
};

GuessingArea.propTypes = {
  outcome: PropTypes.array.isRequired,
  setOutcome: PropTypes.func.isRequired,
  dispatchScore: PropTypes.func.isRequired,
  gameDetails: PropTypes.shape({
    dateColumn: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    solutions: PropTypes.array.isRequired,
    hints: PropTypes.array.isRequired
  }).isRequired
};

export default GuessingArea;
