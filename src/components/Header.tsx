import { STYLE_THEME } from '@/styles/constants/theme';
import styled from '@emotion/styled';

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return <S.Container>{children}</S.Container>;
};

export default Header;

const S = {
  Container: styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;
    width: 100%;
    background-color: ${STYLE_THEME.color.black};
    box-sizing: border-box;
    color: ${STYLE_THEME.color.white};
    font-weight: ${STYLE_THEME.fontWeight.extraBold};
    font-size: ${STYLE_THEME.fontSize.large};
    line-height: 16px;
  `,
};
