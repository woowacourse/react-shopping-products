import * as S from './Spinner.style';

interface SpinnerProps {
  height: string;
}

function Spinner({ height }: SpinnerProps) {
  return (
    <S.SpinnerContainer height={height}>
      <S.Spinner />
    </S.SpinnerContainer>
  );
}

export default Spinner;
