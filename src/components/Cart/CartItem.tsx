import { MergedProduct } from "../../types";
import Image from "../Image/Image";
import CartItemCount from "./CartItemCount";
import S from "./CartItem.module.css";
import { useCart } from "../../hooks/useCart";

const CartItem = ({ mergedProduct }: { mergedProduct: MergedProduct }) => {
	const { handleRemoveFromCart } = useCart();

	return (
		<div className={S.cartContainer}>
			<Image src={mergedProduct.product.imageUrl} alt="상품 이미지" className="cart" />
			<div className={S.cartInfo}>
				<p className={S.productName}>{mergedProduct.product.name}</p>
				<p className={S.productPrice}>{mergedProduct.product.price.toLocaleString()}원</p>
				<div className={S.cartCountWrap}>
					<CartItemCount mergedProduct={mergedProduct} />
				</div>
			</div>
			<button className={S.removeButton} onClick={() => mergedProduct.id && handleRemoveFromCart(mergedProduct.id)}>
				삭제
			</button>
		</div>
	);
};

export default CartItem;
