import S from "./ItemCard.module.css";

const ItemCard = ({ isCart }: { isCart: boolean }) => {
	return (
		<div className={S.cardContainer}>
			<img className={S.cardImg} src="https://velog.velcdn.com/images/minsungje/post/f74f79d5-5c51-4bac-97ce-1c2b2764fb80/image.jpg" alt="" />
			<div className={S.contentContainer}>
				<div className={S.itemDescription}>
					<p className={S.cardName}>상품이름</p>
					<p>35,000원</p>
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
