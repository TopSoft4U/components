import styled from "styled-components";
import _Button from "react-bootstrap/Button";
import _Spinner from "react-bootstrap/Spinner";

const Button = styled(_Button)`
`;

const Spinner = styled(_Spinner)`
  vertical-align: middle;
  margin-right: .4rem;
  width: 1em;
  height: 1em;
  border-width: .15em;
`;

export const ProgressButtonSC = {
  Button,
  Spinner,
};
