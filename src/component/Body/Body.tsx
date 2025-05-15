import { css } from "@emotion/react";

const bodyLayout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 36px 25px;
  box-sizing: border-box;
  gap: 28px;
  min-height: 100vh;
`;

export default function Body({ children }: { children: React.ReactNode }) {
  return <body css={bodyLayout}>{children}</body>;
}
