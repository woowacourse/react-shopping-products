import { useShoppingContext } from "../../context/useShoppingContext";
import { useFilteredProducts } from "../../hooks/useFilteredProducts";
import { loadingLayout } from "../../page/index.style";
import Product from "../Product/Product";
import { QuantitySelector } from "../QuantitySelector/QuantitySelector";
import { ProductActionButton } from "./ProductActionButton";
import { ProductContainerLayout } from "./ProductContainer.style";

function StatusMessage({ message }: { message: string }) {
  return <div css={loadingLayout}>{message}</div>;
}
export default function ProductContainer() {
  const { cart, product, dispatch } = useShoppingContext();
  const filteredProduct = useFilteredProducts();

  if (product.error)
    return (
      <StatusMessage message="상품목록 데이터를 가져오는데 실패했습니다." />
    );

  if (product.loading) return <StatusMessage message="로딩중입니다" />;
  if (product.item.length === 0)
    return <StatusMessage message="상품목록에 상품이 없습니다." />;

  const updateCartProduct = () => {
    dispatch({ type: "update", queryKey: "cart" });
  };

  return (
    <div css={ProductContainerLayout}>
      {filteredProduct.map((product) => {
        const selectedCardItems = cart.item.filter(
          (cartItem) => cartItem.product.id === product.id
        );

        const isSelected = selectedCardItems.length !== 0;

        return (
          <Product
            key={product.id}
            id={product.id}
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.price}
            maxQuantity={product.quantity ?? 10000}
          >
            {isSelected ? (
              <QuantitySelector
                quantity={selectedCardItems[0].quantity}
                cartId={selectedCardItems[0].id}
                onChange={updateCartProduct}
                maxQuantity={product.quantity ?? 10000}
              />
            ) : (
              <ProductActionButton
                productQuantity={product.quantity ?? 0}
                onChange={updateCartProduct}
                productId={product.id}
              />
            )}
          </Product>
        );
      })}
    </div>
  );
}
