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
    <S.Button onClick={onClick} withType={widthType}>
      {children}
    </S.Button>
  );
};

export default BorderButton;

const S = {
  Button: styled.button<{ withType: WidthType }>`
    width: ${(props) => (props.withType === "fit" ? "fit-content" : "100%")};
    padding: ${(props) => (props.withType === "fit" ? "6px" : "12px")};
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
    font-size: 14px;
    cursor: pointer;
  `,
};
