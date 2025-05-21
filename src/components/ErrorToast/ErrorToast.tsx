import Toast from "../@common/Toast/Toast";
import * as S from "./ErrorToast.styles";

interface Props {
  message: string;
  onClose: () => void;
}

const ErrorToast = ({ message, onClose }: Props) => {
  return (
    <Toast visible={!!message} onClose={onClose}>
      <S.ErrorToast>{message}</S.ErrorToast>
    </Toast>
  );
};

export default ErrorToast;
