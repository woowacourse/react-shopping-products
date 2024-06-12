import { ERROR_MESSAGE } from "../../constants";
import { useError } from "../../context/errorContext";
import * as S from "./ToastNotification.styled";

export const ToastNotification = () => {
  const { errorStatus } = useError();

  return errorStatus ? (
    <S.StyledToast>{ERROR_MESSAGE[errorStatus.toString()]}</S.StyledToast>
  ) : null;
};
