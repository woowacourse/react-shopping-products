import styled from '@emotion/styled';

export type SizeType = 'small' | 'large' | 'full';

const BUTTON_SIZE_STYLE: Record<SizeType, Record<string, string>> = {
  small: { width: '24px', height: '24px' },
  large: { width: '40px' },
  full: { width: '100%', padding: '12px' },
};

interface BorderButtonProps {
  size?: SizeType;
}

export const BorderButton = styled.button<BorderButtonProps>(
  ({ theme, size = 'large' }) => {
    const sizeStyle = BUTTON_SIZE_STYLE[size];
    return {
      fontSize: '12px',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      border: `1px solid ${theme.colors.border}`,
      borderRadius: `8px`,

      width: sizeStyle.width,
      height: sizeStyle.height ?? 'auto',
      padding: sizeStyle.padding ?? 0,

      img: {
        width: size === 'small' ? '12px' : size === 'large' ? '16px' : 'auto',
      },
    };
  }
);
