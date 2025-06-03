import S from "./CartCountButton.module.css";

interface PlusButtonProps {
	isDisabled: boolean;
	onClick: () => void;
}

const PlusButton = ({ onClick, isDisabled }: PlusButtonProps) => {
	return (
		<button className={S.countButton} disabled={isDisabled} onClick={onClick}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
				<rect x="0.5" y="0.5" width="24" height="24" rx="8" fill="white" />
				<rect x="1" y="1" width="23" height="23" rx="7.5" stroke="black" strokeOpacity="0.1" />
				<path d="M6.5 12.5H18.5M12.5 18.5V6.5" stroke="#363636" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</button>
	);
};

export default PlusButton;
