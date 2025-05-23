import * as styles from './CartButton.style';
import { ComponentProps } from 'react';

export function AddToCartButton(props: ComponentProps<'button'>) {
  return (
    <button css={[styles.buttonCss, styles.notInCartCss]} {...props}>
      <img src="assets/filledCart.svg" />
      <span>담기</span>
    </button>
  );
}

export function RemoveFromCartButton(props: ComponentProps<'button'>) {
  return (
    <button css={[styles.buttonCss, styles.inCartCss]} {...props}>
      <img src="assets/emptyCart.svg" />
      <span>빼기</span>
    </button>
  );
}
