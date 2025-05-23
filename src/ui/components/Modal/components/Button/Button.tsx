import styled from '@emotion/styled';
import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  variant: 'confirm' | 'cancel';
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({variant, children, ...rest}: ButtonProps) {
  return <StyledButton variant={variant} {...rest}>{children}</StyledButton>;
}

export default Button;

const StyledButton = styled.button<{ variant: 'confirm' | 'cancel' }>`
    width: 80px;
    height: 36px;
    border-radius: 5px;
    font-weight: 700;
    font-size: 15px;
    color: ${({variant}) => (variant === 'confirm' ? '#ffffff' : '#333333')};
    background-color: ${({variant}) => (variant === 'confirm' ? '#333333' : '#ffffff')};
    border: ${({variant}) => (variant === 'confirm' ? 'none' : '1px solid #33333340')};

    &:hover {
        background-color: ${({variant}) =>
                variant === 'confirm' ? '#1C1C1C99' : '#E0E0E0CC'};
    }
`;
