import { Button, CountButton } from "@components/Button/index";
import * as MI from "./ModalInner.style";

const CartItem = () => {
  return (
    <MI.CartItem>
      <MI.CartItemImg
        src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/9f6c7feb-9364-4f7d-a480-96379325f01e/%EB%8D%A9%ED%81%AC-%EB%A1%9C%EC%9A%B0-%ED%94%84%EB%A6%AC%EB%AF%B8%EC%97%84-%EC%97%AC%EC%84%B1-%EC%8B%A0%EB%B0%9C-QPzSIPpT.png"
        alt=""
      />
      <MI.CartItemContent>
        <p className="cart-item_content_name">상품 이름</p>
        <span className="cart-item_content_price">35,000원</span>
        <div className="cart-item_content_amount-bundle">
          <CountButton type="minus" onClick={() => {}} />
          <span className="product-item_content_amount">3</span>
          <CountButton type="plus" onClick={() => {}} />
        </div>
      </MI.CartItemContent>
      <MI.CartItemDeleteButton>
        <Button text="삭제" onClick={() => {}} />
      </MI.CartItemDeleteButton>
    </MI.CartItem>
  );
};

const ModalInner = () => {
  return (
    <>
      <CartItem />
      <MI.TotalPrice>
        <p className="total-price_title">총 결제 금액</p>
        <p className="total-price_price">95,000원</p>
      </MI.TotalPrice>
    </>
  );
};

export default ModalInner;
