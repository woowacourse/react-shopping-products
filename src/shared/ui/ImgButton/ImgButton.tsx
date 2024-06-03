import { ButtonHTMLAttributes } from "react";

import css from "./ImgButton.module.css";

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement>["type"];

interface ImgButtonProps {
  children?: string;
  className?: string;
  alt: string;
  src: string;
  type: ButtonType;
  onClick: () => void;
}

export const ImgButton = ({
  children,
  className,
  alt,
  src,
  type,
  onClick,
}: ImgButtonProps) => {
  return (
    <button
      className={`${css.button} ${className}`}
      type={type}
      onClick={onClick}
    >
      <img className={css.img} alt={alt} src={src}></img>
      {children}
    </button>
  );
};
