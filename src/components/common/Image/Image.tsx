import { ImgHTMLAttributes } from 'react';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {}

export default function Image({ ...props }: Props) {
  return <img {...props} />;
}
