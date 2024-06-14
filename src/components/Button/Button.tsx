import React from 'react';
import styles from './Button.module.css';

interface Button {
  iconSrc?: string;
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  clicked?: boolean;
}

const Button: React.FC<Button> = ({ iconSrc, text, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled} className={styles.button}>
      {text && <p className={styles.buttonText}>{text}</p>}
      {iconSrc && <img src={iconSrc} className={styles.buttonImg} />}
    </button>
  );
};

export default Button;
