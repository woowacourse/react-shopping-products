import { FallbackImageContainer } from './FallbackImage.style';
import { NoneImage } from '@/assets/index';
import React from 'react';

const FallbackImage: React.FC = () => {
  return (
    <FallbackImageContainer>
      <img src={NoneImage} />
    </FallbackImageContainer>
  );
};

export default FallbackImage;
