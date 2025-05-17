import Styled from "@emotion/styled";

export const CartButton = Styled.button<{ variation: "dark" | "light" }>`
  width:59px;
  height:24px;
  border-radius:4px;
  font-size:12px;
  font-weight:600;
  background-color: ${(props) => (props.variation === "dark" ? "black" : "#eaeaea")};
  color: ${(props) => (props.variation === "dark" ? "white" : "black")};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;
