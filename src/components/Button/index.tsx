import { css } from "@emotion/css";

interface ButtonProps {
  title: string;
  onClick: () => void;
  buttonStyled?: React.CSSProperties;
  textStyled?: React.CSSProperties;
  disabled?: boolean;
}
const Button = ({
  title,
  onClick,
  buttonStyled,
  textStyled,
  disabled,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={ButtonStyles}
      style={buttonStyled}
      disabled={disabled}
    >
      <div className={ButtonTextStyles} style={textStyled}>
        {title}
      </div>
    </button>
  );
};

export default Button;

const ButtonStyles = css`
  border-radius: 8px;
  width: 24px;
  height: 24px;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
`;

const ButtonTextStyles = css`
  color: #363636;
  font-size: 20px;
  text-align: center;
`;
