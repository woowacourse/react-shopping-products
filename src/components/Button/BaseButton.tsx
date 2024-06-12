interface BaseButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}

export const BaseButton = ({ onClick, children, ariaLabel }: BaseButtonProps) => {
  return (
    <button onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
};
