import { useError } from '../context/ErrorContext';
import { ErrorWrapper } from '../styles/ErrorMessage';

const ErrorMessage = () => {
  const { errorMessage } = useError();
  return <ErrorWrapper role="alert">{errorMessage}</ErrorWrapper>;
};

export default ErrorMessage;
