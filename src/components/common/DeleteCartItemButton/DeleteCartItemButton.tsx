import * as Styled from "./DeleteCartItemButton.style";

interface DeleteCartItemButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string;
}

export default function DeleteCartItemButton({ buttonText, ...props }: DeleteCartItemButtonProps) {
  return <Styled.DeleteItemButton {...props}>{buttonText}</Styled.DeleteItemButton>;
}
