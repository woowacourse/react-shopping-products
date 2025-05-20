import { ErrorWrapper } from "./ErrorMessage.styled";

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <ErrorWrapper role="alert">{message}</ErrorWrapper>;
};

export default ErrorMessage;
