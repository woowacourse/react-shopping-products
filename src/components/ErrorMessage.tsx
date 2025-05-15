import { ErrorWrapper } from "../styles/ErrorMessage";

type ErrorMessageProps = {
  message?: string;
};

const ErrorMessage = ({
  message = "오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
}: ErrorMessageProps) => {
  return <ErrorWrapper role="alert">{message}</ErrorWrapper>;
};

export default ErrorMessage;
