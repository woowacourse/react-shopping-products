import { BadgeContainer } from './Badge.style';
import { PropsWithChildren } from 'react';

export interface BadgeProps {
  color: string;
  bgColor: string;
}

const Badge: React.FC<PropsWithChildren<BadgeProps>> = ({
  children,
  ...props
}) => {
  return <BadgeContainer {...props}>{children}</BadgeContainer>;
};

export default Badge;
