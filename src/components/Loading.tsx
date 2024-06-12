import LoadingImg from '@/assets/loading.svg?react';
import styled from '@emotion/styled';

const Loading = () => {
  return (
    <S.Container>
      <LoadingImg />
    </S.Container>
  );
};

export default Loading;

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
  `,
};
