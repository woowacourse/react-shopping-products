import * as S from './style';

interface LoadingProps {
  isLoading: boolean;
}

const Loading = ({ isLoading }: LoadingProps) => {
  return (
    isLoading && (
      <S.Container>
        <S.LoadingContainer>
          <S.Ball />
          <S.Ball />
          <S.Ball />
        </S.LoadingContainer>
        <span>Loading</span>
      </S.Container>
    )
  );
};

export default Loading;
