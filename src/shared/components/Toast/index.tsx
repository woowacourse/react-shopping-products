import { ComponentProps } from 'react';
import { createPortal } from 'react-dom';

import { StyledBackDrop, StyledModalContainer } from './Toast.styled';

export type ModalProps = {
  /**
   * The title of the modal
   */
  message: string;
} & ComponentProps<'div'>;

export const Toast = ({ message, ...props }: ModalProps) => {
  return createPortal(
    <>
      <StyledBackDrop aria-hidden="false" />
      <StyledModalContainer role="dialog" aria-modal="true" {...props}>
        {message}
      </StyledModalContainer>
    </>,
    document.body
  );
};
