import { postCartItem } from "../../../api/cartItem";
import { useShoppingContext } from "../../../context/useShoppingContext";
import { loadingLayout } from "../../../page/ShopPage.style";
import { CartItemType } from "../../../types/cartItem";
import Button from "../../unit/Button/Button";
import { QuantitySelector } from "../../unit/QuantitySelector/QuantitySelector";
import Product from "../Product/Product";
import { ProductContainerLayout } from "./ProductContainer.style";

export default function ProductContainer() {
  const { cartItemList, productList, errorProduct, loadingProduct, dispatch } =
    useShoppingContext();

  const onChange = () => {
    dispatch({ type: "updateCartProduct" });
  };

  const AddToCartButton = (id: number) => {
    const handleClick = async () => {
      await postCartItem({ productId: id, quantity: 1 });
      onChange();
    };

    return (
      <Button onClick={handleClick}>
        <img src="./add-shopping-cart.svg" />
        <p>담기</p>
      </Button>
    );
  };

  if (errorProduct)
    <div css={loadingLayout}>
      상품목록 데이터를 가져오는데 실패했습니다. <br /> 다시 시도해주세요
    </div>;

  if (productList.length === 0) {
    <div css={loadingLayout}>상품목록에 상품이 없습니다.</div>;
  }

  if (loadingProduct) <div css={loadingLayout}>로딩중입니다</div>;

  return (
    <div css={ProductContainerLayout}>
      {productList.map((product) => {
        const selectedCardItems = cartItemList.filter(
          (cartItem: CartItemType) => Number(product.id) === cartItem.product.id
        );
        const isSelected = selectedCardItems.length !== 0;
        const cartProduct = cartItemList.filter(
          (cartItem) => cartItem.product.id === product.id
        );

        return (
          <Product
            key={product.id}
            id={product.id}
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.price}
          >
            {isSelected ? (
              <QuantitySelector
                quantity={cartProduct[0].quantity}
                cartId={cartProduct[0].id}
                onChange={onChange}
              />
            ) : (
              AddToCartButton(product.id)
            )}
          </Product>
        );
      })}
    </div>
  );
}
