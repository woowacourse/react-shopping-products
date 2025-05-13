import { ComponentProps, ReactNode } from 'react';

import { StyledButton, StyledImgIcon } from './IconButton.styled';

export type IconButtonProps = {
  /**
   * Sets the image name for the icon.
   * @example 'iconName'
   */
  imgName?: string;
  /**
   * Sets the button content.
   */
  children: ReactNode;
} & ComponentProps<'button'>;

export const IconButton = ({ imgName, children }: IconButtonProps) => {
  return (
    <StyledButton>
      <StyledImgIcon src={`./${imgName}.png`} alt="icon" />
      {children}
    </StyledButton>
  );
};
