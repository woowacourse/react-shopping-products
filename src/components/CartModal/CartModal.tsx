import { createPortal } from "react-dom";
import { Modal } from "@kaori-killer/modal-component";

import Spinner from "../common/Spinner/Spinner";

import useProductList from "../../hooks/useProductList";
import useCartItemsId from "../../hooks/useCartItemsId";

import defaultImage from "/defaultImage.png";

import * as Styled from "./CartModal.styled";

interface CartModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

function CartModal({ isOpen, handleClose }: CartModalProps) {
  const { cartItemsId, addCartItemId, removeCartItemId } = useCartItemsId();
  const { state, productList } = useProductList({
    category: "전체",
    sort: "id,asc",
  });

  const selectedProducts = productList.filter((product) =>
    cartItemsId.some((item) => item.productId === product.id.toString())
  );

  const getCartQuantity = (productId: string) => {
    return (
      cartItemsId.find((item) => item.productId === productId)?.cartQuantity ??
      0
    );
  };

  const handleDecreaseProductQuantity = async (
    event: React.MouseEvent<HTMLButtonElement>,
    quantity: number
  ) => {
    const $product = event.currentTarget.closest("li");
    $product && addCartItemId($product.id, Math.max(quantity - 1, 0));
  };

  const handleIncreaseProductQuantity = async (
    event: React.MouseEvent<HTMLButtonElement>,
    quantity: number
  ) => {
    const $product = event.currentTarget.closest("li");
    $product && addCartItemId($product.id, quantity + 1);
  };

  const handleRemoveProduct = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const $product = event.currentTarget.closest("li");
    $product && removeCartItemId($product.id);
  };

  return createPortal(
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Modal.Content position="bottom" size="large">
        <Modal.Header direction="row" align="start" justify="start">
          <Modal.Title tag="h1" fontSize="25px" fontWeight="700">
            장바구니
          </Modal.Title>
          <Modal.CloseButton onClose={handleClose} />
        </Modal.Header>

        <Modal.Body>
          {state.isLoading && <Spinner />}

          {state.isSuccess && selectedProducts.length === 0 && (
            <p>장바구니에 담긴 상품이 없습니다.</p>
          )}

          {state.isSuccess && (
            <Styled.List>
              {selectedProducts.map((product) => {
                const productId = product.id.toString();
                const cartQuantity = getCartQuantity(productId);

                return (
                  <Styled.ListItem key={product.id} id={productId}>
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
                          onClick={(event) =>
                            handleDecreaseProductQuantity(event, cartQuantity)
                          }
                        >
                          -
                        </button>
                        <p>{cartQuantity}</p>
                        <button
                          onClick={(event) =>
                            handleIncreaseProductQuantity(event, cartQuantity)
                          }
                        >
                          +
                        </button>
                      </Styled.QuantityControl>
                    </Styled.Info>
                    <Styled.RemoveButton onClick={handleRemoveProduct}>
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
                  const quantity = getCartQuantity(item.id.toString());
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
