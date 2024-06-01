import styled from '@emotion/styled';

export const Container = styled.div<{ $width: string; $height: string }>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: calc(${({ $height }) => $height}*20 / 100) 0px;
  white-space: pre-line;
`;

interface AdjustedImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  $containerWidth: string;
  $containerHeight: string;
}
export const AdjustedImg = styled.img<AdjustedImgProps>`
  width: calc(${({ $containerWidth }) => $containerWidth}*60 / 100);
  height: calc(${({ $containerHeight }) => $containerHeight}*60 / 100);
  object-fit: contain;
`;

export const MessageSpan = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
`;
