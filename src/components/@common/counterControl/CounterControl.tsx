import * as S from './CounterControl.styles';

interface CounterControlProps {
  count: number;
  maxCount: number;
  onPlusCount: () => void;
  onMinusCount: () => void;
}

const CounterControl = (props: CounterControlProps) => {
  const { count, maxCount, onPlusCount, onMinusCount } = props;

  return (
    <S.CountButtonContainer>
      <S.CounterButton onClick={onMinusCount}>-</S.CounterButton>
      <S.CountNumber>{count}</S.CountNumber>
      <S.CounterButton onClick={onPlusCount} disabled={count >= maxCount}>
        +
      </S.CounterButton>
    </S.CountButtonContainer>
  );
};

export default CounterControl;
