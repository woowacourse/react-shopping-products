import S from "./ItemCard.module.css";

interface ItemCardImageProps {
	imageUrl: string;
}

const ItemCardImage = ({ imageUrl }: ItemCardImageProps) => {
	return (
		<img
			className={S.cardImg}
			src={imageUrl}
			alt="상품 이미지"
			onError={(e) => {
				const target = e.target as HTMLImageElement;
				target.src = "./images/default-image.png";
			}}
		/>
	);
};

export default ItemCardImage;
