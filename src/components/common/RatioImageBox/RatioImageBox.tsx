import { HTMLAttributes, useState } from 'react';
import { StyledRatioImageBox as S } from './RatioImageBox.styled';

type RatioImageBoxProps = HTMLAttributes<HTMLImageElement> & {
  ratio: number;
  alt?: string;
  border?: string;
  radius?: 's' | 'm' | 'l' | 'none' | number;
  backgroundColor?: string;
  src: string;
};

const RatioImageBox = ({ src = '', alt, border, radius = 'none', ...rest }: RatioImageBoxProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <S.ContainerWithRatio {...rest}>
      <S.Image
        isLoading={isLoading}
        onLoad={handleImageLoad}
        src={src}
        alt={alt !== '' ? alt : 'img'}
        border={border}
        radius={radius}
      />
    </S.ContainerWithRatio>
  );
};

export default RatioImageBox;
