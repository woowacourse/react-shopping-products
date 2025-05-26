import { MergedProduct } from "../../types";
import { useCartState } from "../Context/StoreContext";
import S from "./CartItem.module.css";
import CartItemCount from "./CartItemCount";

const CartItem = ({ product }: { product: MergedProduct }) => {
	const { updateCartItem } = useCartState();

	return (
		<div className={S.cartContainer}>
			<img
				src={product.imageUrl}
				alt="상품 이미지"
				className={S.cartImg}
				onError={(e) => {
					const target = e.target as HTMLImageElement;
					target.src = "./images/default-image.png";
				}}
			/>
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
