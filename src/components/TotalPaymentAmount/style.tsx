import styled from '@emotion/styled';

export const TotalPaymentAmount = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const AmountInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AmountText = styled.span`
  ${(props) => props.theme.typography.cartItem.totalPaymentAmountText};
  color: ${(props) => props.theme.color.darkBlack};
`;

export const Amount = styled.span`
  ${(props) => props.theme.typography.cartItem.totalPaymentAmount};
  color: ${(props) => props.theme.color.black};
`;
