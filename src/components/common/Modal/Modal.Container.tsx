import { css } from "@emotion/react";
import styled from "@emotion/styled";

import useFocusTrap from "../../../hooks/useFocusTrap";
import { useModalContext } from "../../../hooks/useModalContext";

type ModalContainerProps = {
  /**
   * The content of the modal
   */
  children: React.ReactNode;
  /**
   * position of the modal
   * @default 'center'
   */
  position?: "center" | "bottom";
  /**
   * Custom styles for the modal
   */
  containerStyle?: React.CSSProperties;

  /**
   * size of the modal
   */
  size?: "small" | "medium" | "large";
};

const ModalContainer = ({
  children,
  position = "center",
  containerStyle = {},
  size = "medium",
}: ModalContainerProps) => {
  const { $zIndex = 1000, ...props } = useModalContext();

  const modalRef = useFocusTrap<HTMLDivElement>();

  return (
    <StyledModalContainer
      role="dialog"
      aria-modal="true"
      position={position}
      modalZIndex={$zIndex + 1}
      containerStyle={containerStyle}
      size={size}
      ref={modalRef}
      {...props}
    >
      {children}
    </StyledModalContainer>
  );
};

export default ModalContainer;

const positionStyle = {
  center: css`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 16px;
    animation: fadeIn 0.2s ease-out forwards;

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `,
  bottom: css`
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 16px 16px 0 0;
    animation: slideUp 0.2s ease-out forwards;

    @keyframes slideUp {
      0% {
        transform: translate(-50%, 100%);
      }
      100% {
        transform: translate(-50%, 0);
      }
    }
  `,
} as const;

const modalSizes = {
  small: css`
    width: 90%;
    max-width: 320px;
    max-height: 240px;
  `,
  medium: css`
    width: 100%;
    max-width: 480px;
    max-height: 360px;
  `,
  large: css`
    width: 100%;
    max-width: 600px;
    max-height: 450px;
  `,
} as const;

const fontSizes = {
  small: css`
    font-size: 1rem;
    line-height: 1.5;
  `,
  medium: css`
    font-size: 1.125rem;
    line-height: 1.6;
  `,
  large: css`
    font-size: 1.25rem;
    line-height: 1.7;
  `,
} as const;

const StyledModalContainer = styled.div<
  { modalZIndex: number } & ModalContainerProps
>`
  display: flex;
  flex-direction: column;
  gap: 16px;

  box-sizing: border-box;
  overflow-y: auto;

  width: 100%;
  max-width: 400px;
  height: auto;
  position: fixed;
  background-color: white;
  padding: 18px 24px;
  ${({ position = "center" }) => positionStyle[position]};
  ${({ size = "medium" }) => modalSizes[size]};
  ${({ size = "medium" }) => fontSizes[size]};
  ${({ containerStyle }) => ({ ...containerStyle })};
  z-index: ${({ modalZIndex }) => modalZIndex};
`;
