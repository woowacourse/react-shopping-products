import styled from "styled-components";

export const Wrapper = styled.div`
  width: 182px;
  height: 224px;
  border-radius: 8px;
  background-color: grey;
`;

export const Image = styled.div<{ $imgUrl: string }>`
  background-image: url(${({ $imgUrl }) => $imgUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 50%;
  border-radius: 8px 8px 0 0;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  height: 50%;
  padding-right: 8px;
  padding-top: 14px;
`;
