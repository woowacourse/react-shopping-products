export interface ButtonProps {
  children: React.ReactNode;
  color: "light" | "dark";
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
