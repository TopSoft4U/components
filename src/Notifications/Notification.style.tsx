import styled from "styled-components";

const Text = styled.div``;

const Container = styled.div`
  color: #FFF;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: .4rem .5rem;
  position: relative;
  line-height: 1.15rem;

  ${Text}:first-child {
    font-weight: bolder;
  }
`;

const Title = styled(Text)`
`;

const Content = styled(Text)`
`;

const ButtonClick = styled.button`
`;

const ButtonClose = styled.button`
  border: none;
  background: none;
  color: #fff;
  font-weight: bolder;
  position: absolute;
  right: 0;
  height: 100%;
  padding: .25rem .75rem;
  &:hover {
    background: rgba(255, 255, 255, .25);
  }
`;

export const NotificationSC = {
  Container,
  Title,
  Content,
  ButtonClick,
  ButtonClose,
};
