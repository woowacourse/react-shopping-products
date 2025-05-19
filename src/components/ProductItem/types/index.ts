export interface CartItemState {
  isInCart: boolean;
  text: string;
  keyword: 'remove' | 'add';
}
