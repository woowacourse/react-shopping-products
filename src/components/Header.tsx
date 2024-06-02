import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';

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
    background-color: ${theme.color.black};
    box-sizing: border-box;
    color: ${theme.color.white};
    font-weight: ${theme.fontWeight.extraBold};
    font-size: ${theme.fontSize.large};
    line-height: 16px;
  `,
};
