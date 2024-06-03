import * as S from "./PageTitle.style";

interface PageTitleProp {
  children: React.ReactNode;
}

const PageTitle = ({ children }: PageTitleProp) => {
  return <S.Title>{children}</S.Title>;
};

export default PageTitle;
