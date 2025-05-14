import S from "./ItemCard.module.css";

interface ItemCardProps {
	imageUrl: string;
	name: string;
	price: number;
	isCart: boolean;
}

const ItemCard = ({ imageUrl, name, price, isCart }: ItemCardProps) => {
	return (
		<div className={S.cardContainer}>
			<img
				className={S.cardImg}
				src={imageUrl}
				alt="상품 이미지"
				onError={(e) => {
					const target = e.target as HTMLImageElement;
					target.src = "./images/default-image.png";
				}}
			/>
			<div className={S.contentContainer}>
				<div className={S.itemDescription}>
					<p className={S.cardName}>{name}</p>
					<p>{price.toLocaleString()}원</p>
				</div>
				<div className={S.buttonWrap}>
					{isCart ? (
						<button className={S.removeCartButton}>
							<img className={S.cartImg} src="/images/remove-cart.svg" alt="장바구니 제거" />
							<p>빼기</p>
						</button>
					) : (
						<button className={S.addCartButton}>
							<img className={S.cartImg} src="/images/add-cart.svg" alt="장바구니 추가" />
							<p>담기</p>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default ItemCard;
