import { HTMLAttributes, useState } from 'react';
import styles from './ImageBox.module.css';

export type ImageBoxProps = HTMLAttributes<HTMLImageElement> & {
  src: string;
  radius?: 's' | 'm' | 'l' | 'none';
  width: number;
  height: number;
  border?: string;
  backgroundColor?: string;
  alt?: string;
};

const ImageBox = ({
  src = '',
  width,
  height,
  alt,
  border,
  radius = 'none',
  ...rest
}: ImageBoxProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div {...rest}>
      <img
        className={styles[`radius-${radius}`]}
        onLoad={handleImageLoad}
        src={src}
        alt={alt !== '' ? alt : 'img'}
        style={{
          width,
          height,
          border,
          backgroundColor: isLoading ? '#e0e0e0' : 'transparent',
        }}
      />
    </div>
  );
};

export default ImageBox;
