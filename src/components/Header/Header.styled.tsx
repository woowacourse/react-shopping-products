import styled from "@emotion/styled";

export const Container = styled.header`
  background-color: #000000;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;

  a {
    text-decoration: none;
  }
`;

export const Title = styled.p`
  font-weight: 800;
  font-size: 20px;
  color: #ffffff;
`;

export const Button = styled.button`
  height: 24px;
  padding: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  line-height: 1;
`;

export const Image = styled.img`
  width: 24px;
  height: 100%;
`;
