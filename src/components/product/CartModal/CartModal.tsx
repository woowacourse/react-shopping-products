import * as Styled from './CartModal.styled';

import { CompoundModal } from 'le-sserafim';
import SelectedItem from '../CartIem/SelectedItem';
import { formatKoreanCurrency } from '@utils/currency';
import mocks from '@mocks/handlers/products/mockData';

export default function CartModal() {
  return (
    <CompoundModal
      position='bottom'
      size='free'
      style={{ padding: '24px 16px' }}
    >
      <Styled.Title>장바구니</Styled.Title>
      <Styled.SelectedItemsContainer>
        <SelectedItem cartItem={{ id: 1, quantity: 1, product: mocks[0] }} />
        <SelectedItem cartItem={{ id: 1, quantity: 1, product: mocks[0] }} />
      </Styled.SelectedItemsContainer>
      <Styled.AmountContainer>
        <Styled.AmountDescription>총 결제 금액</Styled.AmountDescription>
        <Styled.AmountCurrency>
          {formatKoreanCurrency(10000)}
        </Styled.AmountCurrency>
      </Styled.AmountContainer>

      <CompoundModal.buttonContainer>
        <CompoundModal.button buttonTheme='primary' onClick={() => {}}>
          닫기
        </CompoundModal.button>
      </CompoundModal.buttonContainer>
    </CompoundModal>
  );
}
