import { MergedProduct } from "../../types";
import ItemCardInfo from "./ItemCardInfo";
import ItemCardButton from "./ItemCardButton";
import Image from "../Image/Image";
import CartItemSoldOut from "../Cart/CartItemSoldOut";
import S from "./ItemCard.module.css";

const ItemCard = ({ mergedProduct }: { mergedProduct: MergedProduct }) => {
	return (
		<div className={S.cardContainer}>
			<Image src={mergedProduct.product.imageUrl} alt="상품 이미지" className="card" />
			{mergedProduct.product.quantity === 0 && <CartItemSoldOut />}
			<div className={S.contentContainer}>
				<ItemCardInfo name={mergedProduct.product.name} price={mergedProduct.product.price} />
				<div className={S.buttonWrap}>
					<ItemCardButton mergedProduct={mergedProduct} />
				</div>
			</div>
		</div>
	);
};
export default ItemCard;
