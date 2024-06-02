import { ERROR } from '../../../assets/images';
import * as S from './style';

interface ErrorToastProps {
  message: string;
}

const ErrorToast = ({ message }: ErrorToastProps) => {
  return (
    <S.Container>
      <S.SideBar />
      <S.InfoContainer>
        <img src={ERROR} />
        <S.TextContainer>
          <S.Title>Error</S.Title>
          {message}
        </S.TextContainer>
      </S.InfoContainer>
    </S.Container>
  );
};

export default ErrorToast;
