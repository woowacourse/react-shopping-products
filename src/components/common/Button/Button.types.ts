export interface ButtonProps {
  children: React.ReactNode;
  color: "light" | "dark";
  onClick: () => void;
}
