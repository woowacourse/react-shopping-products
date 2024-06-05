import CartItemBox from '@/components/cart/CartItemBox';
import styled from '@emotion/styled';
import useGetCartListQuery from '@/hooks/cart/useGetCartListQuery';

const CartList = () => {
  const { data: cartList } = useGetCartListQuery();

  return (
    <S.ListWrapper>
      {cartList.map((item) => (
        <CartItemBox key={item.id} item={item} />
      ))}
    </S.ListWrapper>
  );
};
export default CartList;

const S = {
  ListWrapper: styled.div`
    width: 100%;
    max-height: 450px;
    overflow-y: scroll;
  `,
};
