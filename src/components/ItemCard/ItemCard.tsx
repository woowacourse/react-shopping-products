import { MergedProduct } from "../../types";
import ItemCardImage from "./ItemCardImage";
import ItemCardInfo from "./ItemCardInfo";
import ItemCardButton from "./ItemCardButton";
import S from "./ItemCard.module.css";

const ItemCard = ({ mergedProduct }: { mergedProduct: MergedProduct }) => {
	return (
		<div className={S.cardContainer}>
			<ItemCardImage imageUrl={mergedProduct.imageUrl} />
			{mergedProduct.quantity === 0 && <div className={S.backGround}>품절</div>}
			<div className={S.contentContainer}>
				<ItemCardInfo name={mergedProduct.name} price={mergedProduct.price} />
				<div className={S.buttonWrap}>
					<ItemCardButton mergedProduct={mergedProduct} />
				</div>
			</div>
		</div>
	);
};
export default ItemCard;
