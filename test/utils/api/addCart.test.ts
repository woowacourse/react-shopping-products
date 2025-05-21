import { http, HttpResponse } from 'msw';
import { CART_URL } from '../../../src/constants/endpoint';
import addCart from '../../../src/utils/api/addCart';
import { server } from '../../../src/mocks/server';

describe('addCart API', () => {
  it('장바구니에 아이템을 추가하는 API가 오류 없이 정상적으로 작동한다.', () => {
    const productId = 1;
    const quantity = 1;

    expect(addCart(productId, quantity)).resolves.not.toThrow();
  });

  it('장바구니에 아이템을 추가하는 API에 잘못된 요청을 한 경우, 오류가 발생한다.', () => {
    server.use(
      http.post(CART_URL, async () => {
        return HttpResponse.json({ message: '잘못된 요청입니다.' }, { status: 400 });
      })
    );

    expect(addCart(NaN, 0)).rejects.toThrow('잘못된 요청입니다.');
  });

  it('장바구니에 아이템을 추가할 때 재고보다 초과되는 경우, 오류가 발생한다.', () => {
    expect(addCart(4, 2)).resolves.not.toThrow();
    expect(addCart(4, 3)).rejects.toThrow('재고 수량을 초과하여 담을 수 없습니다.');
  });
});
