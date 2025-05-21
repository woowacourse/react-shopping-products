import S from "../ItemCard/ItemCard.module.css";

const ProductImage = ({ imageUrl }: { imageUrl: string }) => {
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

export default ProductImage;
