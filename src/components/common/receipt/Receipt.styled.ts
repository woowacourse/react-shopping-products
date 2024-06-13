import styled from '@emotion/styled';

export const borderTopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  border-top: 1px solid ${(props) => props.theme.color.borderGray};
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

  color: ${(props) => props.theme.color.captionBlack};
  ${(props) => props.theme.typography.totalPurchasePrice};
`;

export const priceText = styled.span`
  display: flex;
  align-items: center;

  height: 100%;

  color: ${(props) => props.theme.color.black};
  ${(props) => props.theme.typography.totalPurchasePrice};
`;
