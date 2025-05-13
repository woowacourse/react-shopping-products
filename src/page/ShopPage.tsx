import { css } from "@emotion/react";

const pagelayout = css`
  width: 340px;
  background-color: white;
  border: 1px solid black;
`;

export default function ShopPage() {
  return <div css={pagelayout}></div>;
}
