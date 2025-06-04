import styled from "@emotion/styled";

const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <ErrorContainer data-testid={"error-message"}>
      {errorMessage}
    </ErrorContainer>
  );
};

export default ErrorMessage;

const ErrorContainer = styled.header`
  width: 500px;
  min-height: 64px;
  background-color: #ffc9c9;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
`;
