import S from './SkeletonCard.module.css';

const SkeletonCard = () => {
  return (
    <div className={S.cardContainer}>
      <div className={S.skeletonImg} />
      <div className={S.contentContainer}>
        <div className={S.itemDescription}>
          <div className={S.skeletonLine} />
          <div className={S.skeletonLine} />
        </div>
        <div className={S.buttonWrap}>
          <div className={S.skeletonLine} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
