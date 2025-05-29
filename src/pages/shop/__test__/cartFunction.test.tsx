import { CartProvider } from '@/components/features/cart';
import { resetCartItems } from '@/mocks/handlers';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import ShopPage from '../ShopPage';

describe('SHOP 페이지에 접속 시', () => {
  beforeEach(() => {
    resetCartItems();

    render(
      <CartProvider>
        <ShopPage />
      </CartProvider>
    );
  });

  it('장바구니 아이콘에 현재 장바구니 아이템 수가 표시된다', async () => {
    const cartButton = await screen.findByTestId('cart-button');
    expect(cartButton.textContent).toBe('4');
  });

  it('담기 버튼 클릭 시 장바구니 아이콘 숫자가 +1 증가한다', async () => {
    const cartButton = await screen.findByTestId('cart-button');
    expect(cartButton.textContent).toBe('4');

    // 장바구니에 id 26인 상품이 담겨있지 않음
    const firstProductCard = await screen.findByTestId('product-26'); // 상품목록 목데이터의 첫 번째 id
    const addButton = within(firstProductCard).getByRole('button');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByTestId('cart-button').textContent).toBe('5');
    });
  });

  it('+ 버튼 클릭 시 currentCart의 해당 cart 항목의 수량이 1 증가한다', async () => {
    const targetProductCard = await screen.findByTestId('product-1'); // 장바구니 목데이터의 에어포스1
    const cartQuantity = within(targetProductCard).getByText('1');
    expect(cartQuantity).toBeInTheDocument();

    const plusButton = within(targetProductCard).getAllByRole('button')[1];

    fireEvent.click(plusButton);

    await waitFor(async () => {
      const updatedCartQuantity = await within(targetProductCard).findByText(
        '2'
      );
      expect(updatedCartQuantity).toBeInTheDocument();
    });
  });

  it('장바구니에 담겨있는 상품에서 "-" 버튼 클릭 시 장바구니 아이콘 숫자가 -1 감소한다', async () => {
    const targetProductCard = await screen.findByTestId('product-3');
    const cartQuantity = await within(targetProductCard).findByText('1');
    expect(cartQuantity).toBeInTheDocument();
    const minusButton = within(targetProductCard).getAllByRole('button')[0];

    fireEvent.click(minusButton); // 빼기 버튼 클릭

    const cartButton = await screen.findByTestId('cart-button');

    await waitFor(() => {
      expect(cartButton.textContent).toBe('3');
    });
  });

  it('개수가 0개인 상품 카드에는 "품절" 오버레이 문구가 표시된다', async () => {
    const soldOutProductCard = await screen.findByTestId('product-34');

    const soldOutText = within(soldOutProductCard).getByText('품절');

    expect(soldOutText).toBeTruthy();
  });
});
