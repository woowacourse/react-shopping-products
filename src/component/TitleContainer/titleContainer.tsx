import { titleContainerLayout } from "./TitleContainer.style";

interface TitleContainerProps {
  title: string;
  children?: React.ReactNode;
}

export default function TitleContainer({
  title,
  children,
}: TitleContainerProps) {
  return (
    <div css={titleContainerLayout}>
      {title}
      {children}
    </div>
  );
}
