import React, { useCallback } from "react";
import PropTypes from "prop-types";

import { H1, InvisibleButton } from "./StyledComponents.js";

const GameHeader = ({ total, points, correct, clearScore }) => {
  const scoreBarClick = useCallback(() => {
    window.confirm("Clear Score?") && clearScore();
  }, [clearScore]);

  return (
    <header style={{ textAlign: "center", margin: "0 0 1.5em" }}>
      <H1>Page Title!</H1>
      <p style={{ margin: 0 }}>
        <small>Guess the search trend in the chart below.</small>
      </p>
      <p style={{ margin: 0 }}>
        {total > 0 ? (
          <InvisibleButton onClick={scoreBarClick}>
            <small>
              {points}&ensp;|&ensp;
              {((100 * correct) / total).toFixed(2)}%
            </small>
          </InvisibleButton>
        ) : (
          <small>&ndash;</small>
        )}
      </p>
    </header>
  );
};

GameHeader.propTypes = {
  total: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  correct: PropTypes.number.isRequired,
  clearScore: PropTypes.func.isRequired
};

export default GameHeader;
