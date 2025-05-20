import {SerializedStyles} from '@emotion/react';
import * as S from './CustomButton.styles';

interface CustomButtonProps {
  iconUrl?: string;
  title?: string;
  css?: SerializedStyles;
  onClick: () => void;
}

export default function CustomButton({
  iconUrl,
  title,
  onClick,
  css,
}: CustomButtonProps) {
  return (
    <S.CustomButton onClick={onClick} css={css}>
      {iconUrl && <S.ButtonIcon src={iconUrl} />}
      {title && <S.ButtonTitle>{title}</S.ButtonTitle>}
    </S.CustomButton>
  );
}
