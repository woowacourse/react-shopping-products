interface BaseButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export const BaseButton: React.FC<BaseButtonProps> = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};
