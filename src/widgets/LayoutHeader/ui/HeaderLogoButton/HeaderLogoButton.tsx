import { assets, ImgButton } from "@/shared";

import css from "./HeaderLogoButton.module.css";

export const HeaderLogoButton = () => {
  // FIXME: This will route to home page
  const handleOnClick = () => {};

  return (
    <ImgButton
      className={css.headerLogoButton}
      alt={"cart"}
      src={assets.logo}
      type={"button"}
      onClick={handleOnClick}
    />
  );
};
