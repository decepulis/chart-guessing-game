import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import HintArea from "./HintArea";

const SubmitRow = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const SubmitInput = styled.input`
  border: 4px solid ${props => props.theme.black};
  font-size: 1.25em;
  padding: 0.5em;
  margin: 0;
  flex: 4 0 275px;
`;
const SubmitButton = styled.button`
  cursor: pointer;
  background: white;
  border: 4px solid ${props => props.theme.black};
  font-size: 1.25em;
  padding: 0.5em;
  margin: 0;
  flex: 1 0 auto;
`;

const GuessingArea = ({ gameDetails }) => {
  const [guess, setGuess] = useState("");

  const handleSubmit = e => {
    console.log("submit");
    e.preventDefault();
  };
  const handleChangeGuess = e => {
    setGuess(e.target.value);
  };

  return (
    <section>
      <HintArea hints={gameDetails.hints} />
      <form onSubmit={handleSubmit}>
        <SubmitRow>
          <SubmitInput
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
  gameDetails: PropTypes.shape({
    dateColumn: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    solutions: PropTypes.array.isRequired,
    hints: PropTypes.array.isRequired
  }).isRequired
};

export default GuessingArea;
