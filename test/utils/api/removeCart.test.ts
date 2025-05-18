import { http, HttpResponse } from 'msw';
import { CART_URL } from '../../../src/constants/endpoint';
import removeCart from '../../../src/utils/api/removeCart';
import { server } from '../../../src/mocks/server';

describe('removeCart API', () => {
  it('장바구니에 아이템을 제거하는 API가 오류 없이 정상적으로 작동한다.', async () => {
    const cartId = 1;
    await expect(removeCart(cartId)).resolves.not.toThrow();
  });

  it('장바구니에 아이템을 제거하는 API에 잘못된 요청을 한 경우, 오류가 발생한다.', async () => {
    server.use(
      http.delete(`${CART_URL}/:id`, () =>
        HttpResponse.json({ message: '잘못된 요청입니다.' }, { status: 400 })
      )
    );

    await expect(removeCart(NaN)).rejects.toThrow('잘못된 요청입니다.');
  });
});
