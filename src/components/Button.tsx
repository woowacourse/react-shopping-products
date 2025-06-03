import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps } from 'react';

type VariantsProps = 'smallBlack' | 'smallGrey' | 'smallWhite';

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

  smallWhite: css`
    max-width: 24px;
    height: 24px;
    padding: 6px;
    background-color: var(--color-white);
    color: var(--color-black);
    border: 1px solid var(--color-grey);
    border-radius: 8px;
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

export const ButtonContainer = styled.button<{ $variant: VariantsProps }>`
  width: 100%;
  border-radius: 4px;
  box-sizing: border-box;

  display: flex;
  justify-content: center;

  ${({ $variant }) => buttonStyles[$variant]}
`;
