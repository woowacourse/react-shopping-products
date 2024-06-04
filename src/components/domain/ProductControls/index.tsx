import S from "./styledComponent";

const ProductControls = () => {
  return (
    <S.ProductControls>
      <S.Button
        onClick={() => {
          /*TODO: 수량 감소 */
        }}
      >
        -
      </S.Button>
      <S.Quantity>{3}</S.Quantity>
      <S.Button
        onClick={() => {
          /*TODO: 수량 증가*/
        }}
      >
        +
      </S.Button>
    </S.ProductControls>
  );
};

export default ProductControls;
