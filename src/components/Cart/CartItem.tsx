import { MergedProduct } from "../../types";
import { useStoreContext } from "../Context/StoreContext";
import S from "./CartItem.module.css";
import CartItemCount from "./CartItemCount";

const CartItem = ({ product }: { product: MergedProduct }) => {
	const { updateCartItem } = useStoreContext();

	return (
		<div className={S.cartContainer}>
			<img src="https://velog.velcdn.com/images/minsungje/post/c27c57cb-fcbb-4641-b72d-0e2030739ae7/image.jpg" alt="상품 이미지" className={S.cartImg} />
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
