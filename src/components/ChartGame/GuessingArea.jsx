import React, { useState } from "react";
import PropTypes from "prop-types";
import stringSimilarity from "string-similarity";

import { SubmitRow, SubmitInput, SubmitButton } from "./StyledComponents";
import HintArea from "./HintArea";

const SUCCESS_THRESHOLD = 0.66;

const GuessingArea = ({ hints, solutions, setOutcome, dispatchScore }) => {
  const [guess, setGuess] = useState("");
  const [points, setPoints] = useState(3);

  const handleSubmit = e => {
    e.preventDefault();

    const similarity = stringSimilarity.findBestMatch(
      guess.toLowerCase(),
      solutions.map(solution => solution.toLowerCase())
    );
    const { rating } = similarity.bestMatch;

    if (rating > SUCCESS_THRESHOLD) {
      setOutcome([false, true]);
      dispatchScore({ type: "correct", points });
    } else {
      setOutcome([false, false]);
      dispatchScore({ type: "incorrect" });
    }
  };
  const handleChangeGuess = e => {
    setGuess(e.target.value);
  };
  const decrementPoints = () => {
    setPoints(points - 1);
  };
  return (
    <section style={{ paddingBottom: "1.5em" }}>
      <HintArea hints={hints} decrementPoints={decrementPoints} />
      <form onSubmit={handleSubmit}>
        <SubmitRow>
          <SubmitInput
            placeholder="What search trend is this?"
            type="text"
            value={guess}
            onChange={handleChangeGuess}
          />
          <SubmitButton type="submit">
            {guess.length > 0 ? (
              <>
                <div>Submit</div>
                <small>{`${points} point${points > 1 ? "s" : ""}`}</small>
              </>
            ) : (
              <>
                <div>Give Up</div>
                <small>0 points</small>
              </>
            )}
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
