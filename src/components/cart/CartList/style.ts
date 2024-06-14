import styled from '@emotion/styled';

export const CartItemsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 100%;
  min-height: 224px;
  max-height: inherit;
  overflow-y: scroll;
`;

export const OverflowIndicator = styled.div`
  position: sticky;
  left: 0;
  bottom: 0;
  visibility: ${({ hidden }) => (hidden ? 'none' : 'visible')};

  width: 100%;
  padding: 16px 0;
  color: ${({ theme }) => theme.colors.gray};

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgb(255, 255, 255);
  background: -moz-linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 37%,
    rgba(255, 255, 255, 0) 100%
  );
  background: -webkit-linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 37%,
    rgba(255, 255, 255, 0) 100%
  );
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 37%,
    rgba(255, 255, 255, 0) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#ffffff",GradientType=1);
`;

export const EmptyCartList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  width: 100%;
  margin: auto;
`;
