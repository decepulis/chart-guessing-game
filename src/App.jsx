import React from "react";
import styled from "styled-components";
import ChartGame from "./components/ChartGame";

const StyledMain = styled.main`
  width: 100vw;
  min-height: 110vh;
  padding: 0 0.5em;
  background-color: ${props => props.theme.primaryColor};
  color: ${props => props.theme.black};
`;

const H1 = styled.h1`
  font-family: "Playfair Display", serif;
  font-weight: 900;
  font-style: italic;
  font-size: 3rem;
  text-align: center;

  margin: 0;
  padding: 1rem 0;
`;

function App() {
  return (
    <StyledMain>
      <header>
        <H1>Page Title!</H1>
      </header>
      <ChartGame />
    </StyledMain>
  );
}

export default App;
