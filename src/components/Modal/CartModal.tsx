import Modal from "dslgpgh-modal";
import { useEffect } from "react";
import CartItem from "../Cart/CartItem";
import S from "./CartModal.module.css";
import { useTotalAmount } from "../../hooks/useTotalAmount";
import { useCart } from "../../hooks/useCart";

interface CartModalProps {
	isOpen: boolean;
	onClick: () => void;
}

const CartModal = ({ isOpen, onClick }: CartModalProps) => {
	const { cartItems } = useCart();
	const totalAmount = useTotalAmount();

	useEffect(() => {
		if (!isOpen) return;

		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isOpen]);

	return (
		<Modal isOpen={isOpen} onClose={onClick} modalPosition={"bottom"} size={"full"}>
			<Modal.Header>장바구니</Modal.Header>
			<Modal.Body>
				{cartItems.map((cartItem) => (
					<CartItem mergedProduct={cartItem} key={cartItem.id} />
				))}
				<div className={S.totalPriceContainer}>
					<p className={S.totalText}>총 결제 금액</p>
					<p className={S.totalPrice}>{totalAmount.toLocaleString()}원</p>
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Modal.ActionButton onClick={onClick}>닫기</Modal.ActionButton>
			</Modal.Footer>
		</Modal>
	);
};

export default CartModal;
