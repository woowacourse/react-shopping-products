import { PropsWithChildren } from "react";
import styled from "@emotion/styled";

const S = {
  Title: styled.h1`
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;

    margin: 10px 0;
  `,
};

const MainTitle = ({ children }: PropsWithChildren) => {
  return <S.Title>{children}</S.Title>;
};

export default MainTitle;
