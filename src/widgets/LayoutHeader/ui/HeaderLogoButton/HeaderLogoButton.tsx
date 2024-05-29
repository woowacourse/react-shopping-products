import { assets, ImgButton } from '@/shared';

import css from './HeaderLogoButton.module.css';

export const HeaderLogoButton = () => {
  // FIXME: This will route to home page
  const handleOnClick = () => {
    console.log('clicked');
  };

  return (
    <ImgButton className={css.logoButton} alt={'cart'} src={assets.logo} type={'button'} onClick={handleOnClick} />
  );
};
