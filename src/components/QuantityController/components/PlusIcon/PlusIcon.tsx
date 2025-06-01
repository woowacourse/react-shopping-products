import styled from "@emotion/styled";

interface PlusIconProps {
  onClick?: () => void;
  disabled?: boolean;
}

const PlusIcon = ({ onClick, disabled = false }: PlusIconProps) => {
  return (
    <IconButton onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <rect width="24" height="24" rx="8" fill="white" />
        <rect
          x="0.5"
          y="0.5"
          width="23"
          height="23"
          rx="7.5"
          stroke="black"
          strokeOpacity="0.1"
        />
        <path
          d="M6 12H18M12 18V6"
          stroke="#363636"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconButton>
  );
};

export default PlusIcon;

const IconButton = styled.button<{ disabled?: boolean }>`
  all: unset;
  width: 24px;
  height: 24px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  border-radius: 8px;
`;
