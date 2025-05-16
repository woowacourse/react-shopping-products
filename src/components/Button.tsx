import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps } from 'react';

type VariantsProps = 'smallBlack' | 'smallGrey';

interface ButtonProps extends Pick<ComponentProps<'button'>, 'type' | 'name' | 'id' | 'onClick'> {
  children: React.ReactNode;
  variant: VariantsProps;
}

const buttonStyles = {
  smallBlack: css`
    max-width: 65px;
    height: 29px;
    padding: 4px 8px;
    background-color: var(--color-black);
    color: var(--color-white);
  `,

  smallGrey: css`
    max-width: 65px;
    height: 29px;
    padding: 4px 8px;
    background-color: var(--color-grey);
    color: var(--color-black);
  `,
};

const Button = ({ children, variant, ...buttonProps }: ButtonProps) => {
  return (
    <ButtonContainer
      type={buttonProps.type}
      name={buttonProps.name}
      id={buttonProps.id}
      onClick={buttonProps.onClick}
      $variant={variant}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button;

const ButtonContainer = styled.button<{ $variant: VariantsProps }>`
  width: 100%;
  border-radius: 4px;
  box-sizing: border-box;

  ${({ $variant }) => buttonStyles[$variant]}
`;
