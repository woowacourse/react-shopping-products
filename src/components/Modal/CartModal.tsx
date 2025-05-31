import Modal from "dslgpgh-modal";
import { useLayoutEffect } from "react";
import CartItem from "../Cart/CartItem";
import S from "./CartModal.module.css";
import { useMergedProducts } from "../../hooks/useMergedProducts";
interface CartModalProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CartModal = ({ isOpen, setIsOpen }: CartModalProps) => {
	const mergedProducts = useMergedProducts();
	const cartInfo = mergedProducts.filter((product) => product.cartInfo);
	const totalAmount = cartInfo.reduce((sum, product) => {
		if (!product.cartInfo) {
			return sum;
		}
		return sum + product.price * product.cartInfo.quantity;
	}, 0);

	useLayoutEffect(() => {
		if (!isOpen) return;

		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isOpen]);

	return (
		<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} modalPosition={"bottom"} size={"full"}>
			<Modal.Header>장바구니</Modal.Header>
			<Modal.Body>
				{cartInfo.map((product) => (
					<CartItem product={product} key={product.id} />
				))}
				<div className={S.totalPriceContainer}>
					<p className={S.totalText}>총 결제 금액</p>
					<p className={S.totalPrice}>{totalAmount.toLocaleString()}원</p>
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Modal.ActionButton onClick={() => setIsOpen(false)}>닫기</Modal.ActionButton>
			</Modal.Footer>
		</Modal>
	);
};

export default CartModal;
