import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 16px;
  gap: 12px;
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: 1px solid lightGray;
  background-color: white;
`;

export const MessageText = styled.p`
  margin-top: 2px;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`;
