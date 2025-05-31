import ProductCard from "../productCard/ProductCard";
import { CardListContainer } from "./ProductCardList.css";
import { useData } from "../../provider/DataProvider";
import { CartItemType, Product } from "../../types/response.types";

function ProductCardList() {
  const { getData } = useData();

  const products = getData<Product[]>("products") || [];
  const cart = getData<CartItemType[]>("cart") || [];

  return (
    <div css={CardListContainer}>
      {products?.map((item) => {
        const cartItem = cart.find(
          (cartItem) => cartItem.product.id === item.id
        );

        const cartInfo = {
          cartId: cartItem?.id,
          cartAmount: cart.length,
        };

        const productInfo = {
          productId: item.id,
          name: item.name,
          price: item.price,
          imageUrl: item.imageUrl,
          isAdded: Boolean(cartItem),
          quantity: item.quantity,
        };

        return (
          <ProductCard
            cartInfo={cartInfo}
            productInfo={productInfo}
            key={item.id}
          />
        );
      })}
    </div>
  );
}

export default ProductCardList;
