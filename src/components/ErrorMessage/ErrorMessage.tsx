import * as S from './ErrorMessage.styled';
interface ErrorMessageProps {
  message?: string;
}
const ErrorMessage = ({
  message = '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
}: ErrorMessageProps) => {
  return <S.ErrorMessageContainer>{message}</S.ErrorMessageContainer>;
};

export default ErrorMessage;
