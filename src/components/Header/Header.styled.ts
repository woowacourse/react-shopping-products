import styled from "@emotion/styled";

export const HeaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;
`;
export const BasketWrapper = styled.div`
  position: relative;
`;

export const BasketCountTextWrapper = styled.div`
  width: 19px;
  height: 19px;
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-radius: 50%;

  color: #000;
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 700;
  line-height: 19px;
  text-align: center;
  align-items: center;
`;
