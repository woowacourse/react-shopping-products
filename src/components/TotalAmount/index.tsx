import * as S from "@/components/TotalAmount/style";

interface TotalAmountProps {
  amount: number;
}

const TotalAmount = ({ amount }: TotalAmountProps) => {
  return (
    <S.Wrapper>
      <S.Text>총 결제 금액</S.Text>
      <S.AmountPrice>{amount.toLocaleString()}원</S.AmountPrice>
    </S.Wrapper>
  );
};

export default TotalAmount;
