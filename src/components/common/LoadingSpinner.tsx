import styled, { keyframes } from "styled-components";

const LoadingSpinner = () => {
  return <S.LoadingSpinner />;
};

export default LoadingSpinner;

const rotate360 = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

const S = {
  LoadingSpinner: styled.div`
    animation: ${rotate360} 1s linear infinite;
    transform: translateZ(0);

    border-top: 3px solid #d4d4d4;
    border-right: 3px solid #d4d4d4;
    border-bottom: 3px solid #d4d4d4;
    border-left: 6px solid black;
    background: transparent;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin: 0 auto;
  `,
};
