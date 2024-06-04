import styled from "styled-components";
import QuantitySetter from "../QuantitySetter";

const CartItem = () => {
  return (
    <S.Container>
      <S.ItemImg
        src={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfFt-m3c3jODvbJ5uiY28Z8deAMH8vBfCYsQ&s"
        }
      />
      <S.DescriptionContainer>
        <S.ItemName>고양이</S.ItemName>
        <S.ItemPrice>100000</S.ItemPrice>
        <QuantitySetter></QuantitySetter>
      </S.DescriptionContainer>
      <S.DeleteButton>삭제</S.DeleteButton>
    </S.Container>
  );
};

export default CartItem;

const S = {
  Container: styled.article`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 1rem;
    margin-bottom: 0.7rem;
  `,
  ItemImg: styled.img`
    flex: 3;
    width: 25%;
    height: 80%;
    object-fit: contain;
    border-radius: 1.6rem;
  `,
  DescriptionContainer: styled.div`
    flex: 6;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 0.5rem;
    margin-bottom: 0;
  `,
  ItemName: styled.h4`
    font-size: 1.6rem;
    font-weight: bold;
  `,
  ItemPrice: styled.p`
    font-size: 1.2rem;
    margin-bottom: 0.1rem;
  `,
  DeleteButton: styled.button`
    flex: 1;
    height: 25%;
    margin-right: 1.7rem;
    padding: 0.3rem 0.5rem;
    color: #0a0d13;
    font-size: 1.2rem;
    border: 0.1rem solid #bebebe;
    border-radius: 0.4rem;
    background-color: #ffffff;
    cursor: pointer;
  `,
};
