import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ComponentProps } from 'react';

type VariantsProps = 'smallBlack' | 'smallGrey';

interface ButtonProps extends Pick<ComponentProps<'button'>, 'type' | 'name' | 'id' | 'onClick'> {
  content: string;
  variant: VariantsProps;
}

const buttonStyles = {
  smallBlack: css`
    width: 59px;
    height: 29p;
    padding: 4px 8px;
    background-color: var(--color-black);
    color: var(--color-white);
  `,

  smallGrey: css`
    width: 59px;
    height: 29px;
    padding: 4px 8px;
    background-color: var(--color-grey);
    color: var(--color-black);
  `,
};

const Button = ({ content, variant, ...buttonProps }: ButtonProps) => {
  return (
    <ButtonContainer
      type={buttonProps.type}
      name={buttonProps.name}
      id={buttonProps.id}
      onClick={buttonProps.onClick}
      $variant={variant}
    >
      {content}
    </ButtonContainer>
  );
};

export default Button;

const ButtonContainer = styled.button<{ $variant: VariantsProps }>`
  border-radius: 4px;

  ${({ $variant }) => buttonStyles[$variant]}
`;
