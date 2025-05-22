import { useErrorMessageContext } from "../../context/ErrorMessageContext";

import styled from "@emotion/styled";

function ErrorMessage() {
  const { errorMessage } = useErrorMessageContext();

  return (
    <Container>
      <p>{errorMessage}</p>
    </Container>
  );
}

export default ErrorMessage;

const Container = styled.div`
  min-width: 430px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 64px;

  padding: 12px 77px;
  background-color: #ffc9c9;
  color: #000000;
`;
