import Button from '../button/Button';
import { ROUTES } from '../../../constants/routes';
import { useNavigate } from 'react-router-dom';
import * as S from './ErrorFallBack.styles';
import { DEFAULT_ERROR_MESSAGE } from '../../../constants/errorMessages';

const ErrorFallBack = ({ message = DEFAULT_ERROR_MESSAGE }: { message?: string }) => {
  const navigate = useNavigate();
  return (
    <S.ErrorFallBackContainer>
      <S.ErrorFalLBackMessage>{message}</S.ErrorFalLBackMessage>
      <Button size="large" color="black" onClick={() => navigate(ROUTES.PRODUCT_LIST_PAGE)}>
        홈으로 이동하기
      </Button>
    </S.ErrorFallBackContainer>
  );
};

export default ErrorFallBack;
