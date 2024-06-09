import styled from '@emotion/styled';

export const QuantityText = styled.span`
  text-align: center;

  width: 1.5rem;

  ${(props) => props.theme.typography.product.quantity};
  color: ${(props) => props.theme.color.darkBlack};
`;
