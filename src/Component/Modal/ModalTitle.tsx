import React from 'react';
import styled from '@emotion/styled';

interface ModalTitleProps {
  children: React.ReactNode;
}

function ModalTitle({ children }: ModalTitleProps) {
  return <StyledModalTitle>{children}</StyledModalTitle>;
}

export default ModalTitle;

const StyledModalTitle = styled.p`
  color: #000;
  font-size: 18px;
  font-weight: 700;
`;
