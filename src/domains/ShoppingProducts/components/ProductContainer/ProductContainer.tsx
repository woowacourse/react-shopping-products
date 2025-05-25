import { useShoppingContext } from "../../context/useShoppingContext";
import { loadingLayout } from "../../page/index.style";
import { CartItemType } from "../../apis/types/cartItem";
import Button from "../../../../components/Button/Button";
import { QuantitySelector } from "../QuantitySelector/QuantitySelector";
import Product from "../Product/Product";
import { ProductContainerLayout } from "./ProductContainer.style";
import { postCartItem } from "../../apis/cartItem";

export default function ProductContainer() {
  const { cart, product, dispatch } = useShoppingContext();

  if (product.error)
    <div css={loadingLayout}>
      상품목록 데이터를 가져오는데 실패했습니다. <br /> 다시 시도해주세요
    </div>;

  if (product.item.length === 0) {
    <div css={loadingLayout}>상품목록에 상품이 없습니다.</div>;
  }

  if (product.loading) <div css={loadingLayout}>로딩중입니다</div>;

  const updateCartProduct = () => {
    dispatch({ type: "update", queryKey: "cart" });
  };

  const handleAddCart = async (id: number) => {
    await postCartItem({ productId: id, quantity: 1 });
    updateCartProduct();
  };

  return (
    <div css={ProductContainerLayout}>
      {product.item.map((product) => {
        const selectedCardItems = cart.item.filter(
          (cartItem: CartItemType) => Number(product.id) === cartItem.product.id
        );
        const isSelected = selectedCardItems.length !== 0;
        const cartProduct = cart.item.filter(
          (cartItem) => cartItem.product.id === product.id
        );

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
                quantity={cartProduct[0].quantity}
                cartId={cartProduct[0].id}
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
