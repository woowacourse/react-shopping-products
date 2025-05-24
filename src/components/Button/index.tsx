import { css } from "@emotion/css";

interface ButtonProps {
  title: string;
  onClick: () => void;
  buttonStyled?: React.CSSProperties;
  textStyled?: React.CSSProperties;
}
const Button = ({ title, onClick, buttonStyled, textStyled }: ButtonProps) => {
  return (
    <button onClick={onClick} className={ButtonStyles} style={buttonStyled}>
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
`;

const ButtonTextStyles = css`
  color: #363636;
  font-size: 20px;
  text-align: center;
`;
