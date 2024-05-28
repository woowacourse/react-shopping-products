import { LogoIcon, ShoppingCart } from '../../../asset';
import { HeaderContainer, HeaderIcon } from './Header.style';

interface HeaderProps {
  headerIconType?: 'home' | 'back';
}

function Header({ headerIconType = 'home' }: HeaderProps) {
  const handleHeaderIcon = ({ headerIconType }: HeaderProps) => {
    switch (headerIconType) {
      default:
        return {
          front: { icon: LogoIcon, width: '5.6rem' },
          back: { icon: ShoppingCart, width: '3rem' },
        };
    }
  };

  const { front, back } = handleHeaderIcon({ headerIconType });

  return (
    <HeaderContainer>
      <HeaderIcon $width={front.width} src={front.icon} />
      <HeaderIcon $width={back.width} src={back.icon} />
    </HeaderContainer>
  );
}

export default Header;
