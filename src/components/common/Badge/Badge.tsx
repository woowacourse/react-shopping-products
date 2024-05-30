import { BadgeProps } from '../../../type';
import { BadgeContainer } from './Badge.style';
import { PropsWithChildren } from 'react';

const Badge: React.FC<PropsWithChildren<BadgeProps>> = ({
  children,
  ...props
}) => {
  return <BadgeContainer {...props}>{children}</BadgeContainer>;
};

export default Badge;
