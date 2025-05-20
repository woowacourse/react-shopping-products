import { ErrorWrapper } from "../styles/ErrorMessage";

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <ErrorWrapper role="alert">{message}</ErrorWrapper>;
};

export default ErrorMessage;
