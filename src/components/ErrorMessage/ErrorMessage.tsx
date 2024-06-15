import * as S from './ErrorMessage.styled';
interface ErrorMessageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  message?: string;
}
const ErrorMessage = ({ message = '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.', style }: ErrorMessageProps) => {
  return <S.ErrorMessageContainer style={style}>{message}</S.ErrorMessageContainer>;
};

export default ErrorMessage;
