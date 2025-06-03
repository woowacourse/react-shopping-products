import S from "./CartCountButton.module.css";
interface MinusButtonProps {
	onClick: () => void;
}

const MinusButton = ({ onClick }: MinusButtonProps) => {
	return (
		<button className={S.countButton} onClick={onClick}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
				<rect x="0.5" y="0.5" width="24" height="24" rx="8" fill="white" />
				<rect x="1" y="1" width="23" height="23" rx="7.5" stroke="black" strokeOpacity="0.1" />
				<path d="M6.5 12.5C11.1863 12.5 13.8137 12.5 18.5 12.5" stroke="#363636" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</button>
	);
};

export default MinusButton;
