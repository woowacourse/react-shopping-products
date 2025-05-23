import Portal from "../Portal/Portal";
import * as S from "./Toast.styles";

interface Props {
  message: string;
}

const Toast = ({ message }: Props) => {
  return (
    <Portal>
      <S.Toast>{message}</S.Toast>
    </Portal>
  );
};

export default Toast;
