import * as Styled from './WrongCat.styled';

import { WrongCatPng } from '@assets/png';

interface Props {
  $width: string;
  $height: string;
  message: string;
}

export default function WrongCat({ $width, $height, message }: Props) {
  return (
    <Styled.Container $width={$width} $height={$height}>
      <Styled.AdjustedImg
        $containerWidth={$width}
        $containerHeight={$height}
        src={WrongCatPng}
        alt='우롱캣'
      />
      <Styled.MessageSpan>{message}</Styled.MessageSpan>
    </Styled.Container>
  );
}
