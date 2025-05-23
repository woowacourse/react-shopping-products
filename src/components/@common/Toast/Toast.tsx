import { ToastType } from "../../../constants/toast";
import Portal from "../Portal/Portal";
import * as S from "./Toast.styles";

interface Props {
  message: string;
  type: ToastType;
}

const Toast = ({ message, type }: Props) => {
  return (
    <Portal>
      <S.Toast $type={type}>{message}</S.Toast>
    </Portal>
  );
};

export default Toast;
