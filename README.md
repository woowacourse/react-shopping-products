# react-shopping-products

## 기능 요구 사항

1. 상품 목록 조회

- 상품 목록을 무한스크롤 방식으로 불러온다.
  - 맨 처음 불러 오는 갯수는 20개다.
  - 이 후 추가로는 4개씩 불러온다.

2. 상품 정렬 및 필터링

- 상품을 카테고리를 기준으로 필터링하여 보여준다.
- 상품을 가격 순으로 정렬하여 보여준다.
  - 낮은 가격 순
  - 높은 가격 순

3. 상품 장바구니 담기

- 사용자가 담기 버튼을 누르면, 장바구니에 추가된다.
- 장바구니에 담긴 아이템 '종류' 의 갯수로 숫자를 표시한다.
- 장바구니 담기 요청 중 에러가 발생한 경우, 에러 메시지를 toast ui를 통해 보여준다.

4. 상품 장바구니 제거

- 장바구니에서 빼기 버튼을 누르면, 장바구니에서 해당 아이템이 제거된다.
- 장바구니에 담긴 아이템 '종류'의 갯수가 줄어든다.

## 기능 구현 목록

1. UI
   - [x] Product
   - [x] Dropdown
   - [x] Header
2. Test

- useProduct

  - [ ] 상품 목록 조회
    - [ ] 상품 목록을 조회한다.
    - [ ] 상품 목록을 조회되기 이전 로딩 값은 true값이다.
    - [ ] 상품 목록을 조회된 이후 로딩 값은 false값이다.
    - [ ] 상품 목록을 조회 중 에러가 발생하면 error값이 반환된다.
  - [ ] 페이지 네이션
    - [ ] 초기 값은 상품 20개를 불러온다.
    - [ ] 다음 페이지는 상품 4개를 불러온다.
    - [ ] 페이지네이션으로 추가 데이터를 발생할 때 로딩 상태를 표시한다.
    - [ ] 마지막 페이지인 경우 데이터를 불러오지 않는다.
  - [ ] 장바구니 담기
    - [ ] 사용자가 담기 버튼을 누르면, 장바구니에 담긴 아이템 종류의 갯수가 +1된다.
    - [ ] 사용자가 빼기 버튼을 누르면, 장바구니에 담긴 아이템 종류의 갯수가 -1된다.
    - [ ] 담기 요청 중 에러가 발생하면, error값이 반환된다.

3. Logic
