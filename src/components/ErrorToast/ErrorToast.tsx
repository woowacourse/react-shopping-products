import Toast from "../@common/Toast/Toast";
import * as S from "./ErrorToast.styles";

interface Props {
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const ErrorToast = ({ errorMessage, setErrorMessage }: Props) => {
  const handleToastEnd = () => setErrorMessage("");

  return (
    <Toast enable={!!errorMessage} onEnd={handleToastEnd}>
      <S.ErrorToast>{errorMessage}</S.ErrorToast>
    </Toast>
  );
};

export default ErrorToast;
