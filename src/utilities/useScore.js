import { useReducer } from "react";

const scoreReducer = (state, action) => {
  switch (action.type) {
    case "correct":
      return {
        ...state,
        points: (state.points += action.points),
        total: (state.total += 1),
        correct: (state.correct += 1)
      };
    case "incorrect":
      return {
        ...state,
        total: (state.total += 1)
      };
    default:
      return state;
  }
};

export default initialScore => useReducer(scoreReducer, initialScore);
