import { Modal } from 'river-modal-component';
import { LogoIcon, ShoppingCart } from '@/assets/index';
import { CartBadge } from '@/components/index';
import { HeaderContainer, HeaderIcon } from './Header.style';

interface HeaderProps {
  headerIconType?: 'home' | 'back';
}

const Header = ({ headerIconType = 'home' }: HeaderProps) => {
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
      <Modal.Trigger>
        <div>
          <CartBadge>
            <HeaderIcon $width={back.width} src={back.icon} />
          </CartBadge>
        </div>
      </Modal.Trigger>
    </HeaderContainer>
  );
};

export default Header;
