import styled from "styled-components";

export const GameContainer = styled.section`
  max-width: 1024px;
  margin: 0 auto;
`;

// TODO: this background color would be nicer
// if it were set on the body, not main.
export const StyledMain = styled.main`
  width: 100vw;
  min-height: 100vh;
  padding: 0 0.5em;
  color: ${props => props.theme.black};
  background-color: ${props => props.theme.primaryColor};
  &.gameOver {
    background-color: #fff;
  }
  transition: background-color: 0.1s ease-in-out;
`;

export const H1 = styled.h1`
  font-family: "Playfair Display", serif;
  font-weight: 900;
  font-style: italic;
  font-size: 3rem;
  margin: 0;
`;
export const InvisibleButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  outline: inherit;
  all: unset;
  cursor: pointer;
`;

export const SolutionBox = styled.div`
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  background-color: ${props =>
    props.success ? `hsla(120,100%,85%,0.8)` : `hsla(0,100%,85%,0.8)`};

  cursor: pointer;

  opacity: 0;
  top: -100%;
  left: -100;
  transition: opacity 0.1s ease-in-out;
  &.visible {
    opacity: 1;
    top: 0;
    left: 0;
  }

  &.visible span {
    transform: rotate(-15deg);
    opacity: 1;
  }
`;
export const SolutionText = styled.span`
  text-align: center;
  font-family: "Playfair Display", serif;
  font-weight: 900;
  font-style: italic;
  font-size: 10rem;
  @media only screen and (max-width: 575px) {
    font-size: 20vw;
  }

  transition: transform 0.2s ease-in-out, opacity 0.1s ease-in-out;
  transform: translate(500px) scale(5) rotate(-45deg);
  opacity: 0;

  @media (prefers-reduced-motion: reduce) {
    transform: rotate(-15deg);
  }
`;
export const SmallBottomText = styled.small`
  position: fixed;
  bottom: 1rem;
  color: ${props => props.theme.gray};
`;

export const SubmitRow = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const SubmitInput = styled.input`
  border: 4px solid ${props => props.theme.black};
  border-radius: 0;
  font-size: 1.25em;
  padding: 0.5em;
  margin: 0;
  flex: 4 0 275px;
`;
export const SubmitButton = styled(InvisibleButton)`
  background: white;
  border: 4px solid ${props => props.theme.black};
  font-size: 1.25em;
  padding: 0.5em;
  margin: 0;
  flex: 1 0 auto;
  text-align: center;
`;
