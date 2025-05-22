import S from './ItemCard.module.css';

interface ItemCardProps {
  imageUrl: string;
  name: string;
  price: number;
  isCart: boolean;
  maxQuantity: number;
  onAddCart: () => void;
  onRemoveCart: () => void;
}

const ItemCard = ({
  imageUrl,
  name,
  price,
  isCart,
  maxQuantity,
  onAddCart,
  onRemoveCart,
}: ItemCardProps) => {
  return (
    <div className={S.cardContainer}>
      <div className={S.imageContainer}>
        {maxQuantity === 0 && (
          <div className={S.overlay}>
            <p>품절</p>
          </div>
        )}
        <img
          className={S.cardImg}
          src={imageUrl}
          alt="상품 이미지"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = './images/default-image.png';
          }}
        />
      </div>
      <div className={S.contentContainer}>
        <div className={S.itemDescription}>
          <p className={S.cardName}>{name}</p>
          <p>{price.toLocaleString()}원</p>
        </div>
        <div className={S.buttonContainer}>
          {isCart ? (
            <div className={S.cartAmountContainer}>
              <button>-</button>
              <p>10</p>
              <button>+</button>
            </div>
          ) : (
            <button className={S.addCartButton} onClick={onAddCart}>
              <img className={S.cartImg} src="./images/add-cart.svg" alt="장바구니 추가" />
              <p>담기</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
