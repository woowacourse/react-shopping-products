// src/components/Button/CartCountButton.tsx
import { MergedProduct } from "../../types";
import S from "./CartCountButton.module.css";

interface CartCountButtonProps {
	type: "plus" | "minus";
	mergedProduct: MergedProduct;
	onUpdate: (type: string, id: number, quantity?: number) => void;
}

const CartCountButton = ({ type, mergedProduct, onUpdate }: CartCountButtonProps) => {
	const isPlus = type === "plus";
	const checkButtonDisable = (isPlus: boolean) => {
		if (isPlus) {
			return mergedProduct.quantity === mergedProduct.cartInfo?.quantity;
		}
		return mergedProduct.cartInfo?.quantity === 0;
	};

	const controlQuantity = (isPlus: boolean) => {
		if (!mergedProduct.cartInfo) return;

		if (isPlus) {
			return mergedProduct.cartInfo.quantity + 1;
		}
		return mergedProduct.cartInfo.quantity - 1;
	};

	const handleClick = () => {
		if (!mergedProduct.cartInfo) return;

		if (!isPlus && mergedProduct.cartInfo.quantity === 1) {
			return onUpdate("remove", mergedProduct.cartInfo.id);
		}

		return onUpdate("change", mergedProduct.cartInfo.id, controlQuantity(isPlus));
	};

	return (
		<button className={S.countButton} disabled={checkButtonDisable(isPlus)} onClick={handleClick}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
				<rect x="0.5" y="0.5" width="24" height="24" rx="8" fill="white" />
				<rect x="1" y="1" width="23" height="23" rx="7.5" stroke="black" strokeOpacity="0.1" />
				{isPlus ? (
					<path d="M6.5 12.5H18.5M12.5 18.5V6.5" stroke="#363636" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				) : (
					<path d="M6.5 12.5C11.1863 12.5 13.8137 12.5 18.5 12.5" stroke="#363636" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				)}
			</svg>
		</button>
	);
};

export default CartCountButton;
