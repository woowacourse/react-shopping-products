import S from './NothingInfo.module.css';

const NothingInfo = ({ description }: { description: string }) => {
  return (
    <div className={S.container}>
      <img className={S.nothingImage} src="./images/nothing-image.png" alt="없음 이미지" />
      <p>{description}</p>
    </div>
  );
};

export default NothingInfo;
