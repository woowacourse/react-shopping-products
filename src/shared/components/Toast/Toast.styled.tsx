import styled from '@emotion/styled';

export const StyledBackDrop = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(31, 41, 55, 0.2);
`;

export const StyledModalContainer = styled.div`
  box-sizing: border-box;
  width: 90%;
  max-width: 400px;
  height: auto;
  position: fixed;
  background-color: white;
  padding: 24px 32px;
  top: 70px;
  left: 50%;
  border-radius: 16px;
`;
