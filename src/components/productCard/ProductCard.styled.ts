import styled from '@emotion/styled';

interface SkeletonMapperProp {
  $isImageLoaded: boolean;
}

const skeletonMapper = ({ $isImageLoaded }: SkeletonMapperProp) => {
  if ($isImageLoaded) return;

  return {
    '::after': {
      fontSize: 0,
      content: '"loading"',
    },
    background: 'linear-gradient(-90deg, #aaa, #f0f0f0, #aaa, #f0f0f0)',
    backgroundSize: '400%',
    animation: 'skeleton-animation 5s infinite ease-out',
    borderRadius: '8px',
  };
};

export const ProductCardBox = styled.div`
  width: 11.375rem;
  height: 14rem;
`;

export const ProductCardImgBox = styled.div`
  width: 100%;
  height: 112px;

  overflow: hidden;
`;

export const ProductCardImg = styled.img<{ $isImageLoaded: boolean }>`
  width: 100%;
  height: 100%;

  border-radius: 8px 8px 0 0;

  object-fit: cover;

  ${(props) => skeletonMapper({ $isImageLoaded: props.$isImageLoaded })}

  @keyframes skeleton-animation {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }
`;

export const ProductCardName = styled.p`
  ${(props) => props.theme.typography.itemName}
`;

export const ProductCardPrice = styled.p`
  ${(props) => props.theme.typography.price}
`;

export const ProductInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ProductCardBody = styled.div`
  padding: 0rem 0.5rem;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const ProductButtonPosition = styled.div`
  display: flex;
  justify-content: flex-end;
`;
