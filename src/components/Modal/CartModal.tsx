// src/components/Modal/CartModal.tsx
import Modal from "dslgpgh-modal";
import { useEffect } from "react";
import CartItem from "../Cart/CartItem";
import S from "./CartModal.module.css";
import { useCartInfo } from "../../hooks/useCartInfo";
import { useTotalAmount } from "../../hooks/useTotalAmount";

interface CartModalProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartModal = ({ isOpen, setIsOpen }: CartModalProps) => {
	const cartItems = useCartInfo();
	const totalAmount = useTotalAmount();

	useEffect(() => {
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
				{cartItems.map((product) => (
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
