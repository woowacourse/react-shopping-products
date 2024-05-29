import css from './ImgButton.module.css';

type ButtonType = 'button' | 'submit' | 'reset';

interface ImgButtonProps {
  className: string;
  alt: string;
  src: string;
  type: ButtonType;
  onClick: () => void;
}

export const ImgButton = ({ className, alt, src, type, onClick }: ImgButtonProps) => {
  return (
    <button className={`${css.button} ${className}`} type={type} onClick={onClick}>
      <img className={css.img} alt={alt} src={src}></img>
    </button>
  );
};
