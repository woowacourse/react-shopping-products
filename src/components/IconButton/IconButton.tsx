import { IconButtonLayout, IconImage } from "./IconButton.style";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  imgUrl: string;
  width?: "sm";
}
export function IconButton({ imgUrl, onClick, width = "sm" }: IconButtonProps) {
  return (
    <button css={IconButtonLayout(width)} onClick={onClick}>
      <img src={imgUrl} css={IconImage(width)} />
    </button>
  );
}
