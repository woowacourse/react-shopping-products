import patchCart from '../../../src/utils/api/patchCart';

describe('patchCart API', () => {
  it('장바구니 아이템의 수량을 변경할 때 재고보다 많은 양을 요청할 경우 오류가 발생한다.', () => {
    expect(patchCart(4, 1)).resolves.not.toThrow();
    expect(patchCart(4, 5)).rejects.toThrow('재고 수량을 초과하여 담을 수 없습니다.');
  });
});
