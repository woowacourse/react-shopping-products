import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  gap: 24px;
`;

export const CloseButton = styled.button`
  position: absolute;
  text-align: center;
  bottom: 12px;
  margin: 12px;
  width: 90%;
  height: 44px;
  background-color: black;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;
