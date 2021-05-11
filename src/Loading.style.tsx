import {Spinner} from "react-bootstrap";
import styled from "styled-components";

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin: 0;
  }
`;

export const LoadingSpinner = styled(Spinner)`
  margin: 1rem 0;
`;
