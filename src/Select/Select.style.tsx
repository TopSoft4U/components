import styled, {css} from "styled-components";

const Container = styled.div`
  position: relative;
  //position: static;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  //border: 1px solid $ts4u-select-border-color;
`;

type InputProps = {
  multi?: boolean;
}
const Input = styled.input<InputProps>`
  border: none;
  outline: none;
  padding: 0;
  //padding: $input-padding-y $input-padding-x;
  width: 100%;
  align-self: center;
  //color: $input-color;
  //font-weight: $input-font-weight;
  ${({multiple}) => css`
    display: inline-flex;
    width: auto;
    flex-grow: 1;
    align-self: center;
    align-items: center;
  `}
`;

const ArrowContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.75rem;
  cursor: pointer;
`;

const Arrow = styled.span`
  border-color: #999 transparent transparent;
  border-style: solid;
  border-width: 5px 5px 2.5px;
  display: inline-block;
  height: 0;
  width: 0;
  position: relative;
`;

export const SelectStyle = {
  Container,
  ArrowContainer,
  InputContainer,
  Arrow,
  Input,
};
