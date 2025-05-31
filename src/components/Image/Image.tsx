import S from "./Image.module.css";

interface ImageProps {
	src: string;
	alt: string;
	className?: string;
}

const Image = ({ src, alt, className }: ImageProps) => {
	const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		const target = e.target as HTMLImageElement;
		target.src = "./images/default-image.png";
	};

	return <img src={src} alt={alt} className={className ? S[className] : ""} onError={handleError} />;
};

export default Image;
