import CartBadgeButton from './CartBadgeButton';
import Logo from './Logo';
import style from './style.module.css';

interface HeaderProps {
  cartItemsLength: number;
  toastPosition: React.MutableRefObject<HTMLElement | null>;
}

function Header({ cartItemsLength, toastPosition }: HeaderProps) {
  return (
    <>
      <header ref={toastPosition} className={style.header}>
        <Logo />
        <CartBadgeButton cartItemsLength={cartItemsLength} />
      </header>
    </>
  );
}

export default Header;
