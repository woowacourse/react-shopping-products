import styled from '@emotion/styled';

export const Container = styled.div<{ position: 'start' | 'end' }>`
  width: 100%;
  display: flex;
  justify-content: ${({ position }) => {
    if (position === 'start') {
      return 'flex-start';
    } else if (position === 'end') {
      return 'flex-end';
    }
  }};
  align-items: center;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const QuantityText = styled.span`
  margin: 0 10px;
  font-size: 12px;
  font-weight: 500;
  color: #0a0d13;
`;
