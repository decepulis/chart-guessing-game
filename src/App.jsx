import React from "react";
import styled from "styled-components";
import ChartGame from "./components/ChartGame";

const StyledMain = styled.main`
  width: 100vw;
  min-height: 100vh;
  padding: 0 0.5em;
  background-color: ${props => props.theme.primaryColor};
  color: ${props => props.theme.black};
`;

const H1 = styled.h1`
  font-family: "Playfair Display", serif;
  font-weight: 900;
  font-style: italic;
  font-size: 3rem;
  margin: 0;
`;

function App() {
  return (
    <StyledMain>
      <header style={{ textAlign: "center", padding: "1.5em 0" }}>
        <H1>Page Title!</H1>
        <small>Guess the search trend in the chart below.</small>
      </header>
      <ChartGame />
    </StyledMain>
  );
}

export default App;
