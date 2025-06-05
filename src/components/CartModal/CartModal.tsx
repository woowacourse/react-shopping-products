import { createPortal } from "react-dom";
import { Modal } from "@kaori-killer/modal-component";

import useProductList from "../../hooks/useProductList";
import useCartItemsId from "../../hooks/useCartItemsId";

import defaultImage from "/defaultImage.png";
import * as Styled from "./CartModal.styled";

interface CartModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

function CartModal({ isOpen, handleClose }: CartModalProps) {
  const { cartItemsId, patchCartItemId, removeCartItemId, state } =
    useCartItemsId();
  const { productList, state: productState } = useProductList({
    category: "전체",
    sort: "id,asc",
  });

  const isSuccess = state.isSuccess && productState.isSuccess;

  const getCartItem = (productId: number) =>
    cartItemsId.find((item) => Number(item.product.id) === productId);

  const getCartQuantity = (productId: number) => {
    return getCartItem(productId)?.quantity ?? 0;
  };

  const patchCartItemByProductId = (productId: number, quantity: number) => {
    const cartItem = getCartItem(productId);
    if (!cartItem) return;
    patchCartItemId(cartItem.id.toString(), quantity);
  };

  const removeCartItemByProductId = (productId: number) => {
    const cartItem = getCartItem(productId);
    if (!cartItem) return;
    removeCartItemId(cartItem.id.toString());
  };

  const handleDecreaseProductQuantity = (productId: number) => {
    const quantity = getCartQuantity(productId);
    patchCartItemByProductId(productId, Math.max(quantity - 1, 0));
  };

  const handleIncreaseProductQuantity = (productId: number) => {
    const quantity = getCartQuantity(productId);
    patchCartItemByProductId(productId, quantity + 1);
  };

  const selectedProducts = isSuccess
    ? productList.filter((product) =>
        cartItemsId?.some(
          (item) =>
            item?.product && Number(item.product.id) === Number(product.id)
        )
      )
    : [];

  return createPortal(
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Modal.Content position="bottom" size="medium">
        <Modal.Header direction="row" align="start" justify="start">
          <Modal.Title tag="h1" fontSize="25px" fontWeight="700">
            장바구니
          </Modal.Title>
          <Modal.CloseButton onClose={handleClose} />
        </Modal.Header>

        <Modal.Body>
          {isSuccess && selectedProducts.length === 0 && (
            <p>장바구니에 담긴 상품이 없습니다.</p>
          )}

          {isSuccess && selectedProducts.length > 0 && (
            <Styled.List>
              {selectedProducts.map((product) => {
                const productId = product.id;
                const cartQuantity = getCartQuantity(productId);

                return (
                  <Styled.ListItem key={productId}>
                    <Styled.Image
                      src={product.imageUrl ?? defaultImage}
                      onError={(e) => (e.currentTarget.src = defaultImage)}
                    />
                    <Styled.Info>
                      <Styled.Name>{product.name}</Styled.Name>
                      <Styled.Price>
                        {product.price.toLocaleString()}원
                      </Styled.Price>
                      <Styled.QuantityControl>
                        <button
                          onClick={() =>
                            handleDecreaseProductQuantity(productId)
                          }
                        >
                          -
                        </button>
                        <p>{cartQuantity}</p>
                        <button
                          onClick={() => {
                            handleIncreaseProductQuantity(productId);
                          }}
                        >
                          +
                        </button>
                      </Styled.QuantityControl>
                    </Styled.Info>
                    <Styled.RemoveButton
                      onClick={() => removeCartItemByProductId(productId)}
                    >
                      삭제
                    </Styled.RemoveButton>
                  </Styled.ListItem>
                );
              })}
            </Styled.List>
          )}
        </Modal.Body>

        <Modal.Footer direction="column" align="start" justify="center">
          <Styled.TotalPriceWrapper>
            <span>총 결제 금액</span>
            <span>
              {selectedProducts
                .reduce((total, item) => {
                  const quantity = getCartQuantity(item.id);
                  return total + quantity * item.price;
                }, 0)
                .toLocaleString()}
              원
            </span>
          </Styled.TotalPriceWrapper>

          <Modal.Button color="dark" size="large" onClick={handleClose}>
            닫기
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>,
    document.body
  );
}

export default CartModal;
