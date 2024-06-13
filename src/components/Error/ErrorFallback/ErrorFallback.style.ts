import styled from "styled-components";

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 50px;
`;

export const ErrorMessage = styled.div`
  padding: 20px;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  color: black;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const ErrorIcon = styled.div`
  color: #f44336;
  font-size: 30px;
  margin-bottom: 20px;
`;

export const RetryIcon = styled.img`
  padding: 10px 10px;
  margin-bottom: 20px;
  font-size: 16px;
  color: #fff;
  background-color: grey;
  border: none;
  border-radius: 40px;
  width: 70px;
  height: 70px;
  cursor: pointer;
  &:hover {
    background-color: lightgrey;
  }
`;
