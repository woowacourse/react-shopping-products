import { css } from "@emotion/react";

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

const headerLayout = css`
  padding: 0 24px;
  width: 100%;
  height: 64px;
  background-color: black;
  align-items: center;
  justify-content: space-between;
  display: flex;
  color: #fff;
  font-family: "Noto Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: 16px;
`;

export default function Header({ title, children }: HeaderProps) {
  return (
    <header css={headerLayout}>
      {title}
      {children}
    </header>
  );
}
