import styled from "styled-components";

export const AmountContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  gap: 15px;
`;

export const AmountDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AmountDetailsTitle = styled.span`
  color: rgba(10, 13, 19, 1);
  font-weight: 700;
  font-size: 16px;
`;

export const AmountDetailsPrice = styled.span`
  color: rgba(0, 0, 0, 1);
  font-weight: 700;
  font-size: 24px;
  line-height: 34.75px;
`;
