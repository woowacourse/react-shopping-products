import styled from '@emotion/styled';

export const Container = styled.div`
  position: fixed;
  width: 100%;
  top: 64px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 4px;
  pointer-events: none;
`;

export const ToastContainer = styled.div`
  width: 100%;
  height: 40px;
  padding: 12px 77px 12px 77px;
  background-color: #ffc9c9;
  text-align: center;
`;

export const Message = styled.span`
  font-weight: 500;
  font-size: 12px;
  color: #0a0d13;
`;
