import styled from 'styled-components';

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const SubTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.5;
`;
