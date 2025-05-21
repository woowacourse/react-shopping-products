import { cartDataType } from '../types/cartItem';
import { ProductDTOType } from '../types/product';

const getProcessedCartArr = ({
  carts,
  products,
}: {
  carts: cartDataType[] | null;
  products: ProductDTOType[];
}) => {
  const cartIdArr = carts?.map((cart) => cart.product.id);
  return products?.map((product) => {
    if (cartIdArr?.includes(product.id)) {
      return {
        ...product,
        isAdd: true,
      };
    }

    return {
      ...product,
      isAdd: false,
    };
  });
};

export default getProcessedCartArr;
