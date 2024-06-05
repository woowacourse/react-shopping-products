import styled from '@emotion/styled';

export const Title = styled.span`
  display: inline-block;
  height: 26px;
  text-align: left;
  margin-bottom: 24px;

  font-size: 18px;
  font-weight: 700;
`;

export const SelectedItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const AmountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-top: 1px solid #e5e5e5;
  padding-top: 12px;

  margin: 24px 0px 14px;
`;

export const AmountDescription = styled.span`
  font-size: 16px;
  font-weight: 700;
`;
export const AmountCurrency = styled.span`
  font-size: 24px;
  font-weight: 700;
`;
