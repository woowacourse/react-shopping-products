import { bodyLayout } from "./Body.style";

export default function Body({ children }: { children: React.ReactNode }) {
  return <body css={bodyLayout}>{children}</body>;
}
