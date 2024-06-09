import minus from "../../asset/Minus.svg";
import styled from "@emotion/styled";

const Minus = () => {
  return <S.Img src={minus} alt="줄이기" />;
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

export default Minus;
