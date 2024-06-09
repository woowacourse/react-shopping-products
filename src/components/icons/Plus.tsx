import plus from "../../asset/Plus.svg";
import styled from "@emotion/styled";

const Plus = () => {
  return <S.Img src={plus} alt="늘리기" />;
};

const S = {
  Img: styled.img`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 12px;
    height: 12px;
  `,
};

export default Plus;
