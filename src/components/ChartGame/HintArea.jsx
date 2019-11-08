import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ButtonArea = styled.button`
  width: 100%;
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  padding: 1em;
  margin: 0;
  border: 4px solid ${props => props.theme.black};
  text-align: center;
`;

const GraySmall = styled.small`
  color: ${props => props.theme.gray};
`;

const HintArea = ({ hints }) => {
  const [hintSlice, setHintSlice] = useState(1);
  const [hintDisabled, setHintDisabled] = useState(false);

  const handleNewHint = e => {
    e.preventDefault();
    setHintDisabled(hintSlice + 1 >= hints.length);
    setHintSlice(hintSlice + 1);
  };

  return (
    <ButtonArea onClick={handleNewHint} disabled={hintDisabled}>
      <h2 style={{ marginTop: 0 }}>Hints</h2>
      {hints.slice(0, hintSlice).map((hint, idx) => (
        <p key={`hint-${idx}`} style={{ marginBottom: "0.25em" }}>
          {hint}
        </p>
      ))}
      {!hintDisabled && (
        <p style={{ marginBottom: "0.25em" }}>
          <GraySmall>Click for more</GraySmall>
        </p>
      )}
    </ButtonArea>
  );
};

HintArea.propTypes = {
  hints: PropTypes.array.isRequired,
  container: PropTypes.object
};

export default HintArea;
