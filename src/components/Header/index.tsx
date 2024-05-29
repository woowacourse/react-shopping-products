import { useState } from 'react';

import { CartAction } from '../Fallbacks';

import CartBadgeButton from './CartBadgeButton';
import Logo from './Logo';
import style from './style.module.css';

interface HeaderProps {
  cartItemsLength: number;
}

function Header({ cartItemsLength }: HeaderProps) {
  const [error, setError] = useState(false);

  const handleClick = () => {
    setError((prev) => !prev);
  };

  return (
    <>
      <header className={style.header}>
        <Logo />
        <CartBadgeButton handleClick={handleClick} cartItemsLength={cartItemsLength} />
      </header>
      {error && <CartAction />}
    </>
  );
}

export default Header;
