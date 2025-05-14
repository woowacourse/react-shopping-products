import { css } from "@emotion/css";
// import RemoveButton from "../Button/RemoveButton";
import AddButton from "../Button/AddButton";
import { Product } from "../../types/product.type";
import shoppingCart from "../../APIs/shoppingCart";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, price, imageUrl } = product;

  const handleAddButton = () => {
    const endpoint = "/cart-items";
    const requestBody = {
      productId: id,
      quantity: 1,
    };

    try {
      shoppingCart({ endpoint, requestBody });
      alert("장바구니에 추가되었습니다.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={id} className={CardFrame}>
      <img src={imageUrl} alt={name} className={CardImage} />
      <div className={CardInfo}>
        <h4>{name}</h4>
        <p>{price.toLocaleString()}원</p>
        <div className={ButtonArea}>
          <AddButton onClick={handleAddButton} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

const CardFrame = css`
  width: 100%;
  height: 224px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CardImage = css`
  width: 100%;
  height: 112px;
  border: none;
  object-fit: cover;
`;

const CardInfo = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px 8px 8px 8px;
  gap: 8px;
`;

const ButtonArea = css`
  display: flex;
  justify-content: flex-end;
`;
