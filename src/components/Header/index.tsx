import CartBadgeButton from './CartBadgeButton';
import Logo from './Logo';
import style from './style.module.css';

interface HeaderProps {
  cartItemsLength: number;
  headerRef: React.MutableRefObject<HTMLElement | null>;
}

function Header({ cartItemsLength, headerRef }: HeaderProps) {
  return (
    <>
      <header ref={headerRef} className={style.header}>
        <Logo />
        <CartBadgeButton cartItemsLength={cartItemsLength} />
      </header>
    </>
  );
}

export default Header;
