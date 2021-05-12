import styled from "styled-components";

const border = "1px solid rgba(0, 0, 0, .2);";

const Container = styled.div`
  border: ${border};
  font-size: .85rem;
  display: inline-flex;
  margin: .125rem;
  line-height: 1rem;
  align-self: center;
  align-items: center;
  background: #FFF;

  &:last-of-type {
    margin-right: .5rem;
  }
`;

const Label = styled.label`
  padding: .1rem .4rem;
  margin-bottom: 0;
  border-right: ${border};
`;

const ButtonRemove = styled.button.attrs({type: "button"})`
  border: none;
  padding: .2rem .5rem;

  &:hover, &:focus {
    background: rgba(0, 0, 0, .1);
  }
`;

export const SelectMultiItemStyle = {
  Container,
  Label,
  ButtonRemove,
};
