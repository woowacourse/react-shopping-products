import { CartInfo } from "../../types";
import ItemCardImage from "./ItemCardImage";
import ItemCardInfo from "./ItemCardInfo";
import ItemCardButton from "./ItemCardButton";
import S from "./ItemCard.module.css";

interface ItemCardProps {
	id: number;
	imageUrl: string;
	name: string;
	price: number;
	cartInfo: CartInfo | null;
}

const ItemCard = ({ id, imageUrl, name, price, cartInfo }: ItemCardProps) => {
	return (
		<div className={S.cardContainer}>
			<ItemCardImage imageUrl={imageUrl} />
			<div className={S.contentContainer}>
				<ItemCardInfo name={name} price={price} />
				<div className={S.buttonWrap}>
					<ItemCardButton productId={id} cartInfo={cartInfo} />
				</div>
			</div>
		</div>
	);
};

export default ItemCard;
