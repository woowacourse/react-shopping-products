import styled from '@emotion/styled';

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
`;

export const Button = styled.button<{ isPushed?: boolean }>`
  position: relative;

  min-width: 58px;
  height: 24px;

  background-color: ${({ isPushed, theme }) =>
    isPushed ? theme.colors.btnActiveBgColor : theme.colors.btnBgColor};
  color: ${({ isPushed, theme }) =>
    isPushed ? theme.colors.black : theme.colors.white};
  padding: 4px 8px;
  border-radius: 4px;

  font-size: 12px;
  font-weight: 600;
  line-height: 15px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

export const QuantityContainer = styled.div`
  margin-top: 24px;
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Quantity = styled.p`
  width: 14px;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: center;
`;
