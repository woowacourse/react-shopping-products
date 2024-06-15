import styled from 'styled-components';

export const TotalPriceWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 16px 0;
`;

export const Label = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #0a0d13;
`;

export const Value = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #000000;
`;

export const TotalPrice = Object.assign(TotalPriceWrapper, { Label, Value });
