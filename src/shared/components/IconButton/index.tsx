import { ComponentProps, ReactNode } from 'react';

import { StyledButton, StyledImgIcon } from './IconButton.styled';

export type IconButtonProps = {
  variant?: 'primary' | 'secondary';
  /**
   * Sets the image name for the icon.
   * @example 'iconName'
   */
  src?: string;
  /**
   * Sets the button content.
   */
  children: ReactNode;
} & ComponentProps<'button'>;

export const IconButton = ({ variant = 'primary', src, children, ...props }: IconButtonProps) => {
  return (
    <StyledButton variant={variant} {...props}>
      <StyledImgIcon src={src} alt="icon" />
      {children}
    </StyledButton>
  );
};
