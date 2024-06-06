import * as Styled from './Receipt.styled';

import { koMoneyFormat } from '@/utils/koMoneyFormat';

interface ReceiptProps {
  title: string;
  price: number;
}

export default function Receipt({ title, price }: ReceiptProps) {
  return (
    <Styled.borderTopWrapper>
      <Styled.priceWrapper>
        <Styled.priceDescription>{title}</Styled.priceDescription>
        <Styled.priceText>{koMoneyFormat(price)}</Styled.priceText>
      </Styled.priceWrapper>
    </Styled.borderTopWrapper>
  );
}
