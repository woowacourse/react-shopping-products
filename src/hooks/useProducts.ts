import getProducts from '../api/getProducts';
import { useAPIContext } from '../Component/Common/Provider';

function useProducts() {
  const { data: products, status } = useAPIContext({
    defaultApiFn: () => getProducts(),
    key: 'products',
  });

  return { products, status };
}

export default useProducts;
