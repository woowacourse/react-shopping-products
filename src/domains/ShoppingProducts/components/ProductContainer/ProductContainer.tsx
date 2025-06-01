import Button from "../../../../components/Button/Button";
import { postCartItem } from "../../apis/cartItem";
import { useShoppingContext } from "../../context/useShoppingContext";
import { useFilteredProducts } from "../../hooks/useFilteredProducts";
import { loadingLayout } from "../../page/index.style";
import Product from "../Product/Product";
import { QuantitySelector } from "../QuantitySelector/QuantitySelector";
import { ProductContainerLayout } from "./ProductContainer.style";

export default function ProductContainer() {
  const { cart, product, dispatch } = useShoppingContext();
  const filteredProduct = useFilteredProducts();

  if (product.error)
    return (
      <div css={loadingLayout}>
        상품목록 데이터를 가져오는데 실패했습니다. <br /> 다시 시도해주세요
      </div>
    );

  console.log(product.loading);
  if (product.loading) return <div css={loadingLayout}>로딩중입니다</div>;

  if (product.item.length === 0) {
    return <div css={loadingLayout}>상품목록에 상품이 없습니다.</div>;
  }

  const updateCartProduct = () => {
    dispatch({ type: "update", queryKey: "cart" });
  };

  const handleAddCart = async (id: number) => {
    await postCartItem({ productId: id, quantity: 1 });
    updateCartProduct();
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
            ) : product.quantity === 0 ? (
              <Button
                onClick={() => handleAddCart(product.id)}
                dataTestid="remove-cart-button"
                style="secondary"
                disabled
              >
                <img src="./remove-shopping-cart.svg" />
                <p>품절</p>
              </Button>
            ) : (
              <Button
                onClick={() => handleAddCart(product.id)}
                dataTestid="add-cart-button"
              >
                <img src="./add-shopping-cart.svg" />
                <p>담기</p>
              </Button>
            )}
          </Product>
        );
      })}
    </div>
  );
}
