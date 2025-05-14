import styled from '@emotion/styled';

export const StyledModalContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 420px;
  height: 50px;
  position: fixed;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4px;
`;

export const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
`;
