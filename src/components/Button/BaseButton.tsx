interface BaseButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const BaseButton: React.FC<BaseButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
