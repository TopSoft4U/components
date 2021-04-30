import {Button} from "react-bootstrap";
import styled from "styled-components";

const Alert = styled.div`
  align-items: center;
  color: #FFF;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  padding: 0.5rem 1rem;
  position: fixed;
  right: 0;
  z-index: 1000;
`;

const Text = styled.p`
  margin-bottom: 0;
`;

const CloseButton = styled(Button)`
  text-shadow: none;
  opacity: 1;
  font-size: 1em;
  line-height: 1;
  font-weight: 600;
  margin-left: .5rem;
`;

export const CookieAlertSC = {
  Alert,
  Text,
  CloseButton,
};
