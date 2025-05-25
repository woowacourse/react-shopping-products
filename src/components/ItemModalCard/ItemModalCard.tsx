import S from './ItemModalCard.module.css';

const ItemModalCard = ({ imageUrl = './images/default-image.png' }) => {
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
            <p className={S.itemTitle}>상품 이름</p>
            <p className={S.itemPrice}>35,000원</p>
          </div>
          <button className={S.itemRemoveButton}>삭제</button>
        </div>
        <div className={S.cartAmountContainer}>
          <button>-</button>
          <p>10</p>
          <button>+</button>
        </div>
      </div>
    </div>
  );
};

export default ItemModalCard;
