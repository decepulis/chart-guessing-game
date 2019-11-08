import React, { useState } from "react";
import PropTypes from "prop-types";
import stringSimilarity from "string-similarity";

import { SubmitRow, SubmitInput, SubmitButton } from "./StyledComponents";
import HintArea from "./HintArea";

const SUCCESS_THRESHOLD = 0.66;

const GuessingArea = ({ hints, solutions, setOutcome, dispatchScore }) => {
  const [guess, setGuess] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    const similarity = stringSimilarity.findBestMatch(
      guess.toLowerCase(),
      solutions.map(solution => solution.toLowerCase())
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
    </section>
  );
};

GuessingArea.propTypes = {
  hints: PropTypes.array.isRequired,
  solutions: PropTypes.array.isRequired,
  setOutcome: PropTypes.func.isRequired,
  dispatchScore: PropTypes.func.isRequired
};

export default GuessingArea;
