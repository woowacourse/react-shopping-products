import * as C from "./Counter.style";

interface CounterProps {
  count: number;
  decrease: () => void;
  increase: () => void;
}

const Counter = ({ count, decrease, increase }: CounterProps) => {
  return (
    <C.Container>
      <C.CountButton onClick={decrease} disabled={count === 1}>
        -
      </C.CountButton>
      <C.Count>{count}</C.Count>
      <C.CountButton onClick={increase}>+</C.CountButton>
    </C.Container>
  );
};

export default Counter;
