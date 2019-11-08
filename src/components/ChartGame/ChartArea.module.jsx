import React from "react";
import styled from "styled-components";

export const ChartContainer = styled.section`
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  background: #ffffff;
  border: 4px solid ${props => props.theme.black};
  height
`;

const Square = styled.div`
  display: inline-block;
  position: relative;
  width: 1rem;
  height: 1rem;
  bottom: -0.125rem;
  background: ${props => (props.background ? props.background : "black")};
`;

const TooltipBody = styled.div`
  background: #fff;
  border: 2px solid ${props => props.theme.black};
  padding: 0 1em;
`;
export const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <TooltipBody>
        <div style={{ margin: "0.25em 0" }}>
          <b>{label}</b>
        </div>
        {payload.map(series => (
          <div key={series.dataKey} style={{ margin: "0.25em 0" }}>
            <Square background={series.stroke} /> {series.value}
          </div>
        ))}
      </TooltipBody>
    );
  }

  return null;
};
