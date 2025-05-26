import ProductCard from "../productCard/ProductCard";
import { CardListContainer } from "./ProductCardList.css";
import ProductCardListSkeleton from "../productCardListSkeleton/ProductCardListSkeleton";
import { useData } from "../dataProvider/DataProvider";

function ProductCardList() {
  const { data } = useData();

  if (data.products === null) return <ProductCardListSkeleton />;

  return (
    <div css={CardListContainer}>
      {data.products?.map((item) => {
        const cartItem = data.cart.find(
          (cartItem) => cartItem.product.id === item.id
        );

        const cartInfo = {
          cartId: cartItem?.id,
          cartAmount: data.cart.length,
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
