import { CountButton } from "../Button";
import * as CCBB from "./CountControlButtonBundle.style";

interface Props {
  amount: number;
  handleDecrementAmount: () => void;
  handleIncrementAmount: () => void;
}

const CountControlButtonBundle = ({
  amount,
  handleDecrementAmount,
  handleIncrementAmount,
}: Props) => {
  return (
    <CCBB.Style>
      <CountButton type="minus" onClick={handleDecrementAmount} />
      <CCBB.Amount>{amount}</CCBB.Amount>
      <CountButton type="plus" onClick={handleIncrementAmount} />
    </CCBB.Style>
  );
};
export default CountControlButtonBundle;
