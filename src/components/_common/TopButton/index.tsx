import * as S from "@/components/_common/TopButton/style";

const TopButton = () => {
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return <S.Wrapper onClick={scrollToTop}>TOP</S.Wrapper>;
};

export default TopButton;
