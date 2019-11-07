import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const GraySmall = styled.small`
  color: ${props => props.theme.gray};
`;

const HintArea = ({ hints }) => {
  const [hintSlice, setHintSlice] = useState(1);
  const [hintDisabled, setHintDisabled] = useState(false);

  const handleNewHint = e => {
    setHintDisabled(hintSlice + 1 >= hints.length);
    setHintSlice(hintSlice + 1);
  };

  return (
    <div onClick={handleNewHint}>
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
    </div>
  );
};

HintArea.propTypes = {
  hints: PropTypes.array.isRequired,
  container: PropTypes.object
};

export default HintArea;
