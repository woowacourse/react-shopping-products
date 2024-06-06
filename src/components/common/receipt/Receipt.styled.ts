import styled from '@emotion/styled';

export const borderTopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  border-top: 1px solid #0000001a;
  padding: 0.625rem 0;
`;

export const priceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 2.625rem;
`;

export const priceDescription = styled.span`
  display: flex;
  align-items: center;

  height: 100%;
  font-size: 1rem;
  font-weight: 700;
  color: #0a0d13;
`;

export const priceText = styled.span`
  display: flex;
  align-items: center;

  height: 100%;
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
`;
