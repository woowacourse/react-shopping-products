import * as S from './style';

interface ToastPopupProps {
  error: Error;
}

const ToastPopup = ({ error }: ToastPopupProps) => {
  return error ? (
    <S.ToastMessage>
      {`${error.message} 오류가 발생하였습니다.`}
      {<br />} {'잠시 후 다시 이용해주세요.'}
    </S.ToastMessage>
  ) : null;
};

export default ToastPopup;
