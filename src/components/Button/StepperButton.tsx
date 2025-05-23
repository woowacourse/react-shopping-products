import { css } from "@emotion/css";

interface StepperButtonProps {
  title: string;
  onClick: () => void;
}
const StepperButton = ({ title, onClick }: StepperButtonProps) => {
  return (
    <button onClick={onClick} className={StepperButtonStyles}>
      <div className={StepperButtonTextStyles}>{title}</div>
    </button>
  );
};

export default StepperButton;

const StepperButtonStyles = css`
  border-radius: 8px;
  width: 24px;
  height: 24px;
  border: none;
  cursor: pointer;
`;

const StepperButtonTextStyles = css`
  color: #363636;
  font-size: 20px;
  text-align: center;
`;
