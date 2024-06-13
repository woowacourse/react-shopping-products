import COLOR_PALETTE from "../../style/colorPalette";
import styled from "@emotion/styled";

type WidthType = "fit" | "full";
interface Props {
  onClick: () => void;
  widthType?: WidthType;
}

const BorderButton = ({
  children,
  widthType = "fit",
  onClick,
}: React.PropsWithChildren<Props>) => {
  return (
    <S.Button onClick={onClick} widthType={widthType}>
      {children}
    </S.Button>
  );
};

export default BorderButton;

const S = {
  Button: styled.button<{ widthType: WidthType }>`
    width: ${(props) => (props.widthType === "fit" ? "fit-content" : "100%")};
    padding: ${(props) => (props.widthType === "fit" ? "6px" : "12px")};
    border-radius: 8px;
    border: 1px solid ${COLOR_PALETTE.blackTransparent};
    background-color: #ffffff;
    font-size: 14px;
    cursor: pointer;
  `,
};
