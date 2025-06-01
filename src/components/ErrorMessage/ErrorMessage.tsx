import { ErrorWrapper } from './ErrorMessage.styled';

const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return <ErrorWrapper role="alert">{errorMessage}</ErrorWrapper>;
};

export default ErrorMessage;
