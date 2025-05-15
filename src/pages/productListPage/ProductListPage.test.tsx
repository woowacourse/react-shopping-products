import { getProducts } from '../../services/productServices';
import { ProductItemType } from '../../types/data';

const mockProducts: ProductItemType[] = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  name: `상품 ${index + 1}`,
  category: index % 2 === 0 ? '식료품' : '패션잡화',
  price: 1000 + index * 100,
  imageUrl: `/images/product-${index + 1}.jpg`,
}));

describe('상품 목록 조회 테스트', () => {
  beforeEach(() => {
    (getProducts as jest.Mock).mockResolvedValueOnce(mockProducts);
  });

  it('최대 20개의 상품을 렌더링할 수 있다.', () => {});

  it('api 요청 실패 시, 에러 메시지가 나타난다.', () => {});

  it('api 요청 중에는 스켈레톤이 표시된다.', () => {});
});
