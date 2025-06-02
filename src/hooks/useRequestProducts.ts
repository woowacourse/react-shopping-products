import getProducts, {
  PAGEABLE_DEFAULT,
  PageableType,
} from '../api/getProducts';
import { useAPIContext } from '../Component/Common/Provider';

function useRequestProducts() {
  const context = useAPIContext({
    key: 'products',
  });

  return {
    ...context,
    requestData: (
      category?: '식료품' | '패션잡화' | string,
      pageable: PageableType = PAGEABLE_DEFAULT
    ) =>
      context.requestData({
        apiFn: () => getProducts(category, pageable),
      }),
  };
}

export default useRequestProducts;
