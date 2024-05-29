import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  position: fixed;
  top: 64px;
  background-color: rgba(255, 201, 201, 1);
  transition: left 0.5s ease-in-out;
`;

export const MessageText = styled.p`
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
`;
