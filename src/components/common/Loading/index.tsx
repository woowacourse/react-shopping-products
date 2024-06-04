import * as S from './style';

export default function Loading() {
  return (
    <S.Container>
      <S.LoadingContainer>
        <S.Ball />
        <S.Ball />
        <S.Ball />
      </S.LoadingContainer>
      <span>Loading</span>
    </S.Container>
  );
}
