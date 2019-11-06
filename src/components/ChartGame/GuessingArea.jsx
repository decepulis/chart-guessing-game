import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const FormInput = styled.input`
  flex: 1 1 auto;
  border: 4px solid ${props => props.theme.black};
`;
const FormRow = styled.div`
  display: flex;
  margin-bottom: 0.75rem;
`;
const FormButton = styled.button`
  flex: 1 1 auto;
  background: white;
  border: 4px solid ${props => props.theme.black};
`;

const GuessingArea = ({ gameDetails }) => {
  const [guess, setGuess] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
  };
  const handleChangeGuess = e => {
    setGuess(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormRow>
        <FormInput
          placeholder="What search trend is this?"
          type="text"
          value={guess}
          onChange={handleChangeGuess}
        />
      </FormRow>
      <FormRow>
        <FormButton>Submit</FormButton>
        <FormButton>Give Up</FormButton>
        <FormButton>Hint?</FormButton>
      </FormRow>
      <FormRow>
        <h2>Hints</h2>
        {/* {hints.map(hint => )} */}
      </FormRow>
    </form>
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
