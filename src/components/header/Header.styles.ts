import styled from '@emotion/styled';

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: var(--color-black);
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  height: var(--height-header);
  box-sizing: border-box;
  z-index: var(--z-index-header);
`;

export const HeaderLogoButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderCartButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
`;

export const HeaderItemCount = styled.div`
  width: 12px;
  height: 12px;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 10px;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 500px;
  background-color: var(--color-white);
  color: var(--color-black);
  font-size: var(--font-size-body);
`;
