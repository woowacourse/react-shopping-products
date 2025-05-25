import { EmptyCartStyle } from './style/EmptyCart.styles';

import Text from '../../@common/Text/Text';

const EmptyCart = () => {
  return (
    <div css={EmptyCartStyle}>
      <Text variant="productName">장바구니가 비었어요...ㅜㅜ</Text>
      <Text variant="description">장바구니에 상품을 담아보세요!</Text>
    </div>
  );
};

export default EmptyCart;
