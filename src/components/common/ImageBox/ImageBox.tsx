import { HTMLAttributes } from 'react';

interface ImageBoxProps extends HTMLAttributes<HTMLImageElement> {
  src?: string;
  radius?: 's' | 'm' | 'l' | number;
  width: number;
  height: number;
  border?: string;
  backgroundColor?: string;
}

const ImageBox = ({ src = '', width, height, ...rest }: ImageBoxProps) => {
  return (
    <div {...rest}>
      <img
        src={src}
        alt="image"
        style={{
          width,
          height,
        }}
      />
    </div>
  );
};

export default ImageBox;
