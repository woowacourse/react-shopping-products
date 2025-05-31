export interface CartItemState {
  isItemInCart: boolean;
  text: string;
  keyword: 'remove' | 'add';
  cartItemId?: number;
  quantity?: number;
}
