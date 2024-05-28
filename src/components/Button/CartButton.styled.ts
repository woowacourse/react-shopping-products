import styled from "styled-components";

export const StyledContainer = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
`;

export const StyledCartButtonImg = styled.img`
  width: 20px;
  height: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledCartCount = styled.div`
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: Montserrat;
  font-size: 10px;
  font-weight: 700;
  line-height: 12.19px;
  text-align: left;
  color: rgba(0, 0, 0, 1);
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 11;
`;
