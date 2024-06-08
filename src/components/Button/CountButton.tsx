import { Minus, Plus } from "../../assets";
import { Container } from "./CountButton.styled";

type CountType = "plus" | "minus";

export const CountButton = ({ type, onClick }: { type: CountType; onClick: () => void }) => {
  return (
    <Container onClick={onClick}>
      <img
        src={type === "plus" ? Plus : Minus}
        alt={type === "plus" ? "상품 수량 더하기" : "상품 수량 빼기"}
      />
    </Container>
  );
};
