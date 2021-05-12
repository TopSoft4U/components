import styled from "styled-components";

const Component = styled.button.attrs({type: "button"})`
  //display: flex;
  //justify-content: center;
  //align-items: center;
  font-size: 1em;
  padding: 0 0.75rem;
  cursor: pointer;

  border: none;
  background: none;

  color: rgba(0, 0, 0, .5);
`;

export const SelectClearButtonStyle = {
  Component,
};
