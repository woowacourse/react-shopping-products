import styled from "styled-components";
import { SCREEN_WIDTH_REM } from "../../styles/GlobalStyle";

const ErrorToast = () => {
  return <S.Container>오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</S.Container>;
};

export default ErrorToast;

const S = {
  Container: styled.section`
    position: fixed;
    top: 0;
    height: 4rem;

    width: ${`${SCREEN_WIDTH_REM}rem`};
    margin-top: 6.4rem;
    font-size: 1.2rem;
    background: #0a0d13;
    background-color: #ffc9c9;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};
