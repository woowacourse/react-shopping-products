import { headerLayout } from "./Header.style";

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

export default function Header({ title, children }: HeaderProps) {
  return (
    <header css={headerLayout}>
      {title}
      {children}
    </header>
  );
}
