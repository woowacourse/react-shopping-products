import { SyntheticEvent } from "react";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
}

const ImageWithFallback = ({
  src,
  fallbackSrc = DEFAULT_FALLBACK_IMAGE,
  ...attributes
}: ImageWithFallbackProps) => {
  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    const target = event.target as HTMLImageElement;
    target.src = fallbackSrc;
  };

  return <img src={src} onError={handleError} {...attributes} />;
};

export default ImageWithFallback;

const DEFAULT_FALLBACK_IMAGE = "/src/assets/defaultFallback.png";
