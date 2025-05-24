import { postCartItem } from "../../../api/cartItem";
import { useShoppingContext } from "../../../hook/useContext/useShoppingContext";

import { CartItemType } from "../../../types/cartItem";
import { ProductType } from "../../../types/product";
import Button from "../../unit/Button/Button";
import { QuantitySelector } from "../../unit/QuantitySelector/QuantitySelector";
import Product from "../Product/Product";
import { ProductContainerLayout } from "./ProductContainer.style";

interface ProductContainerProps {
  products: ProductType[];
}

export default function ProductContainer({ products }: ProductContainerProps) {
  const { cartItemList, dispatch } = useShoppingContext();

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

  return (
    <div css={ProductContainerLayout}>
      {products.map((product) => {
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
