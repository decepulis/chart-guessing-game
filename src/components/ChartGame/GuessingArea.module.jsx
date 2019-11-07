import styled from "styled-components";
export const SubmitRow = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const SubmitInput = styled.input`
  border: 4px solid ${props => props.theme.black};
  font-size: 1.25em;
  padding: 0.5em;
  margin: 0;
  flex: 4 0 275px;
`;
export const SubmitButton = styled.button`
  cursor: pointer;
  background: white;
  border: 4px solid ${props => props.theme.black};
  font-size: 1.25em;
  padding: 0.5em;
  margin: 0;
  flex: 1 0 auto;
`;
export const SolutionBox = styled.div`
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  background-color: ${props =>
    props.success ? `hsla(120,100%,85%,0.8)` : `hsla(0,100%,85%,0.8)`};

  pointer-events: ${props => (props.acceptsClicks ? "auto" : "none")};
  cursor: pointer;

  opacity: 0;
  transition: opacity 0.1s ease-in-out;
  &.visible {
    opacity: 1;
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
