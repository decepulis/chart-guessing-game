import { useReducer } from "react";

const localPoints = parseInt(localStorage.getItem("points"));
const localTotal = parseInt(localStorage.getItem("total"));
const localCorrect = parseInt(localStorage.getItem("correct"));

const initialScore = {
  points: localPoints ? localPoints : 0,
  total: localTotal ? localTotal : 0,
  correct: localCorrect ? localCorrect : 0
};

const scoreReducer = (state, action) => {
  let points = 0;
  let total = 0;
  let correct = 0;

  switch (action.type) {
    case "correct":
      points = state.points += action.points;
      total = state.total += 1;
      correct = state.correct += 1;

      localStorage.setItem("points", points);
      localStorage.setItem("total", total);
      localStorage.setItem("correct", correct);

      return {
        ...state,
        points,
        total,
        correct
      };

    case "incorrect":
      total = state.total += 1;
      localStorage.setItem("total", total);

      return {
        ...state,
        total
      };

    case "clear":
      localStorage.clear();
      return {
        ...state,
        points,
        total,
        correct
      };
    default:
      throw new Error("type not recognized");
  }
};

export default () => useReducer(scoreReducer, initialScore);
