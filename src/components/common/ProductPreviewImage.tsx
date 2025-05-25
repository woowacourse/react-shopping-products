import styled from '@emotion/styled';
import { useState } from 'react';

function ProductPreviewImage({
  imageSource,
  altText = '상품 이미지',
  isSoldOut = false,
}: {
  imageSource: string;
  altText?: string;
  isSoldOut?: boolean;
}) {
  const [imageUrl, setImageUrl] = useState(imageSource);

  return (
    <PreviewImage
      src={imageUrl}
      alt={altText}
      isSoldout={isSoldOut}
      onError={() => {
        setImageUrl('./assets/images/DefaultImage.jpg');
      }}
    />
  );
}

const PreviewImage = styled.img<{ isSoldout: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${({ isSoldout }) => isSoldout && `filter: grayscale(100%) brightness(0.5);`}
`;

export default ProductPreviewImage;
