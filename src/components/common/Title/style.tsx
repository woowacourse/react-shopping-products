import styled from '@emotion/styled';

export const Title = styled.h1`
  height: 2.1875rem;

  ${(props) => props.theme.typography.title}
  color: ${(props) => props.theme.color.black};
`;
