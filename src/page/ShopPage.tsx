import { css } from "@emotion/react";
import Header from "./Header";

const pageLayout = css`
  width: 340px;
  background-color: white;
  border: 1px solid black;
  display: flex;
`;

export default function ShopPage() {
  return (
    <div css={pageLayout}>
      <Header title="shop"></Header>
    </div>
  );
}
