import { HTMLAttributes, useState } from 'react';

interface ImageBoxProps extends HTMLAttributes<HTMLImageElement> {
  src?: string;
  radius?: 's' | 'm' | 'l' | number;
  width: number;
  height: number;
  border?: string;
  backgroundColor?: string;
  alt?: string;
}

const ImageBox = ({ src = '', width, height, alt, ...rest }: ImageBoxProps) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div {...rest}>
      <img
        onLoad={handleImageLoad}
        src={src}
        alt={alt !== '' ? alt : 'img'}
        style={{
          width,
          height,
          backgroundColor: loading ? '#e0e0e0' : 'transparent',
        }}
      />
    </div>
  );
};

export default ImageBox;
