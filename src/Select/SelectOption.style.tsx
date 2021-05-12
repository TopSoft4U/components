import styled, {css} from "styled-components";

type OptionProps = {
  disabled?: boolean;
  selected?: boolean;
  focused?: boolean;
}

export const SelectOptionStyle = styled.div<OptionProps>`
  padding: .5rem;
  cursor: pointer;

  ${({disabled}) => disabled && css`
    opacity: .5;
    cursor: not-allowed;
  `};
  ${({selected}) => selected && css`
    font-weight: bold;
    background: rgba(0, 0, 0, .1);
  `};
  ${({focused}) => focused && css`
    font-weight: bolder;
    background: rgba(0, 0, 0, .03);
  `};
`;
