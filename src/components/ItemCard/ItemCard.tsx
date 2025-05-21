import { CartInfo } from "../../types";
import ProductImage from "../Image/ProductImage";
import ProductInfo from "./CardInfo";
import CartButton from "../Button/CartButton";
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
			<ProductImage imageUrl={imageUrl} />
			<div className={S.contentContainer}>
				<ProductInfo name={name} price={price} />
				<div className={S.buttonWrap}>
					<CartButton productId={id} cartInfo={cartInfo} />
				</div>
			</div>
		</div>
	);
};

export default ItemCard;
