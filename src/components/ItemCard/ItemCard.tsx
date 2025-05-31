import { MergedProduct } from "../../types";

import ItemCardInfo from "./ItemCardInfo";
import ItemCardButton from "./ItemCardButton";
import S from "./ItemCard.module.css";
import Image from "../Image/Image";

const ItemCard = ({ mergedProduct }: { mergedProduct: MergedProduct }) => {
	return (
		<div className={S.cardContainer}>
			<Image src={mergedProduct.imageUrl} alt="상품 이미지" className="card" />
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
