import sample from "/sample.svg";
function ProductCard() {
  return (
    <div>
      <img src={sample}></img>
      <h3>상품이름</h3>
      <p>35,000원</p>
      <button>담기</button>
    </div>
  );
}

export default ProductCard;
