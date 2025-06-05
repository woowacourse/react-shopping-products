import { css } from '@emotion/react';

export default function Body({ children }: { children: React.ReactNode }) {
  return <main css={bodyLayout}>{children}</main>;
}

const bodyLayout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 36px 25px;
  box-sizing: border-box;
  gap: 28px;
  min-height: 100vh;
`;
