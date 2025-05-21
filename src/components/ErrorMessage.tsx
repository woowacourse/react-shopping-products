import { ErrorWrapper } from '../styles/ErrorMessage';

const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return <ErrorWrapper role="alert">{errorMessage}</ErrorWrapper>;
};

export default ErrorMessage;
