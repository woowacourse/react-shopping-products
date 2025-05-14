import * as S from "./ErrorToast.styles";

const ErrorToast = ({ errorMessage }: { errorMessage: string }) => {
  return <S.ErrorToast>{errorMessage}</S.ErrorToast>;
};

export default ErrorToast;
