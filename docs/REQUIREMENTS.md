# 컴포넌트

- 헤더
  - Logo 버튼(홈 버튼)
  - 장바구니 버튼
    - 장바구니에 담긴 상품 종류 개수
- 타이틀
- DropDown
  - 카테고리
  - 정렬 필터
- ProductItem
  - 상품 이미지(imageUrl)
  - 상품 이름(name)
  - 상품 설명(description)
  - 상품 가격(price)
  - 담기 버튼
    - 누르면 POST /cart-items
      ({
      "productId": 0,
      "quantity": 1
      })
      => 원래는 요청을 보내야 하는데, 장바구니 아이템이 업데이트 되면 header의 숫자도 변해야 함.
      => 현재 구현하기는 어려우니까 상태로 처리하는 것도 방법.
- ErrorFallback
  - <ErrorBoundary fallback={<APIFallback/>} />
