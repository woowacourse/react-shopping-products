import { CartInfo } from "../../types";
import addCart from "../../utils/api/addCart";
import removeCart from "../../utils/api/removeCart";
import { useAppContext } from "../Context/AppProvider";
import S from "./ItemCard.module.css";

interface ItemCardProps {
	id: number;
	imageUrl: string;
	name: string;
	price: number;
	cartInfo: CartInfo | null;
}

const ItemCard = ({ id, imageUrl, name, price, cartInfo }: ItemCardProps) => {
	const { refetchCartItems } = useAppContext();
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
					{cartInfo ? (
						<button
							className={S.removeCartButton}
							onClick={async () => {
								await removeCart(cartInfo.id);
								refetchCartItems();
							}}
						>
							<img className={S.cartImg} src="./images/remove-cart.svg" alt="장바구니 제거" />
							<p>빼기</p>
						</button>
					) : (
						<button
							className={S.addCartButton}
							onClick={async () => {
								await addCart(id);
								refetchCartItems();
							}}
						>
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
