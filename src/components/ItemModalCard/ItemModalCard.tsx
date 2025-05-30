import S from './ItemModalCard.module.css';

interface ItemModalCardProps {
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  onRemoveCart: () => void;
  onPatchCart: (quantity: number) => void;
}

const ItemModalCard = ({
  imageUrl,
  name,
  price,
  quantity,
  onPatchCart,
  onRemoveCart,
}: ItemModalCardProps) => {
  const handleRemoveItem = () => {
    if (quantity !== 1) onPatchCart(quantity - 1);
  };

  const handleAddItem = () => onPatchCart(quantity + 1);

  const handleDeleteItem = () => onRemoveCart();

  return (
    <div className={S.container}>
      <img
        className={S.cardImg}
        src={imageUrl}
        alt="상품 이미지"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = './images/default-image.png';
        }}
      />
      <div className={S.contentContainer}>
        <div className={S.infoContainer}>
          <div className={S.itemInfo}>
            <p className={S.itemTitle}>{name}</p>
            <p className={S.itemPrice}>{price.toLocaleString()}원</p>
          </div>
          <button className={S.itemRemoveButton} onClick={handleDeleteItem}>
            삭제
          </button>
        </div>
        <div className={S.cartAmountContainer}>
          <button onClick={handleRemoveItem}>-</button>
          <p>{quantity}</p>
          <button onClick={handleAddItem}>+</button>
        </div>
      </div>
    </div>
  );
};

export default ItemModalCard;
