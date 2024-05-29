import { assets, ImgButton } from '@/shared';

import css from './LogoButton.module.css';

export const LogoButton = () => {
  // FIXME: This will route to home page
  const handleOnClick = () => {
    console.log('clicked');
  };

  return (
    <ImgButton className={css.logoButton} alt={'cart'} src={assets.logo} type={'button'} onClick={handleOnClick} />
  );
};
