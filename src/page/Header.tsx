import { css } from "@emotion/react";

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

const headerLayout = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  width: 100%;
  height: 64px;
  background-color: black;
  color: #fff;
  font-family: "Noto Sans";
  font-size: 20px;
  font-weight: 800;
`;

export default function Header({ title, children }: HeaderProps) {
  return (
    <header css={headerLayout}>
      {title}
      {children}
    </header>
  );
}
