import { MergedProduct } from "../../types";
import { useCartState } from "../Context/StoreContext";
import Image from "../Image/Image";
import CartItemCount from "./CartItemCount";
import S from "./CartItem.module.css";

const CartItem = ({ product }: { product: MergedProduct }) => {
	const { updateCartItem } = useCartState();

	return (
		<div className={S.cartContainer}>
			<Image src={product.imageUrl} alt="상품 이미지" className="cart" />
			<div className={S.cartInfo}>
				<p className={S.productName}>{product.name}</p>
				<p className={S.productPrice}>{product.price.toLocaleString()}원</p>
				<div className={S.cartCountWrap}>
					<CartItemCount mergedProduct={product} />
				</div>
			</div>
			<button className={S.removeButton} onClick={() => product.cartInfo && updateCartItem("remove", product.cartInfo.id)}>
				삭제
			</button>
		</div>
	);
};

export default CartItem;
