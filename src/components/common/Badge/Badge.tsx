import { BadgeProps } from './Badge.type';
import { BadgeContainer } from './Badge.style';

const Badge = ({ children, ...props }: BadgeProps) => {
  return <BadgeContainer {...props}>{children}</BadgeContainer>;
};

export default Badge;
