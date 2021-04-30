import styled, {css} from "styled-components";

export type OffCanvasContainerProps = {
  zIndex?: number;
  transitionDuration?: number;
  width?: string;
  height?: string;
};

const Container = styled.div<OffCanvasContainerProps>`
  background: #fff;
  bottom: 0;
  position: fixed;

  ${({zIndex, transitionDuration}) => css`
    transition: transform ${transitionDuration}ms ease;
    z-index: ${zIndex + 1};
  `}

  &.side-left {
    left: 0;
    transform: translateX(-100%);
    width: ${({width}) => width};

    &.open {
      transform: translateX(0%);
    }
  }

  &.side-right {
    right: 0;
    transform: translateX(100%);
    width: ${({width}) => width};;

    &.open {
      transform: translateX(0%);
    }
  }

  &.side-top {
    height: ${({height}) => height};
    left: 0;
    right: 0;
    top: 0;
    transform: translateY(-100%);

    &.open {
      transform: translateY(0%);
    }
  }

  &.side-bottom {
    height: ${({height}) => height};
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateY(100%);

    &.open {
      transform: translateY(0%);
    }
  }
`;

const Backdrop = styled.div<OffCanvasContainerProps>`
  background: rgba(0, 0, 0, 0.1);
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  visibility: hidden;
  opacity: 0;

  ${({zIndex, transitionDuration}) => css`
    transition: opacity ${transitionDuration} linear, visibility ${transitionDuration} linear;
    z-index: ${zIndex};
  `}

  &.open {
    visibility: visible;
    opacity: 1;
  }
`;

export const OffCanvasSC = {
  Container,
  Backdrop,
};
