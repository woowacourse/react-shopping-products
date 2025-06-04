import { css } from '@emotion/react';

interface TitleContainerProps {
  title: string;
  children?: React.ReactNode;
}

export default function TitleContainer({ title, children }: TitleContainerProps) {
  return (
    <div css={titleContainerLayout}>
      {title}
      {children}
    </div>
  );
}

const titleContainerLayout = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  gap: 24px;
`;
