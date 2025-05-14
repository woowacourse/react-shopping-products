export interface CartToggleButtonProps {
  isAdded: boolean;
  id: number;
  setCartItemIds: React.Dispatch<React.SetStateAction<number[]>>;
}
