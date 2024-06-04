import styled from '@emotion/styled';

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Title = styled.h1`
  ${(props) => props.theme.typography.title}
  color: ${(props) => props.theme.color.black};
`;
