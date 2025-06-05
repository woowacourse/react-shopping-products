import ProductCard from "../productCard/ProductCard";
import { CardListContainer } from "./ProductCardList.css";
import { useCartQuery, useProductQuery } from "../../hooks/useData";
import { CategoryType, SortType } from "../../types/index.types";

function ProductCardList({
  category,
  sort,
}: {
  category: CategoryType;
  sort: SortType;
}) {
  const { data: products } = useProductQuery({ category, sort });
  const { data: cart } = useCartQuery();

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
