# react-shopping-products

## UI

### 컴포넌트

- 헤더 (Header)
- 버튼 (Button)
  - 장바구니 추가/빼기 버튼 (CartControlButton)
- 셀렉트 (SelectBox)
- 에러 토스트 (ErrorToast)
- 상품 리스트 (ProductList)
- 상품 아이템 (ProductItem)
- 상품 리스트 헤더 (ProductListHeader)

### 페이지

- 상품 목록 페이지 (ProductListPage)

## 기능

### 상품 목록 조회

- MSW를 이용하여 /products API를 모킹
- 상품 목록 데이터를 가져오기
- 상품 목록을 무한스크롤 방식으로 표시
  - 맨 처음 불러 오는 갯수는 20개
  - 이 후 추가로는 4개씩 불러온다.

### 상품 정렬 및 필터링

- 상품 필터링
  - 카테고리
- 상품 정렬
  - 낮은 가격 순 (price, asc)
  - 높은 가격 순 (price, desc)

### 상품 장바구니 담기

- 사용자가 담기 버튼을 누르면, 장바구니에 추가된다.

  - 아이템 '종류' 의 갯수로 숫자를 표시

  - 장바구니 담기 요청 중 에러가 발생한 경우, 에러 메시지를 사용자에게 알려주는 UI를 표시

- 장바구니에서 빼기 버튼을 누르면, 장바구니에서 해당 아이템이 제거

## TODO

- [x] 기능

  - [x] API
    - [x] 상품 필터링
      - [x] 카테고리
    - [x] 상품 정렬
      - [x] 낮은 가격 순
      - [x] 높은 가격 순
    - [x] 상품 목록 불러오기
    - [x] 장바구니에 추가
    - [x] 장바구니에 삭제
  - [x] env 파일 생성

  - [x] 담기 요청 중, 에러가 발생할 경우 ErrorToast 출력
    - [x] (일단 후순위) 3초 뒤에 ErrorToast 삭제
  - [x] header의 장바구니에 상품 종류 갯수 반영 (props: cartCount)
  - [x] 상품 장바구니 추가
  - [x] 상품 장바구니에서 제거
    - TODO: 추가 -> 제거 연속으로 하면 에러 발생 (이유: cartItemId를 알 수 없음)
  - [x] 장바구니 목록 불러오기
  - [x] 상품 목록 무한 스크롤
  - [x] selectBox에 연결
    - [x] 상품 필터링
      - [x] 카테고리
    - [x] 상품 정렬
      - [x] 낮은 가격 순
      - [x] 높은 가격 순

---

## 2단계 추가 요구 사항

- [x] UI
  - [x] 상품 목록 페이지 > 상품 아이템: 빼기 버튼 → 수량 조절 버튼 (change)
  - [x] 장바구니 모달 (new feature)
- [x] 기능
  - [x] 장바구니에 담긴 상품의 수량 조절
  - [x] 장바구니에 담긴 상품 삭제
  - [x] 총 결제 금액 계산
- [x] refactoring
  - [x] 기존의 모든 비동기 처리 로직 react query로 구현
    - [x] ProductItem
      - CartItemsContext, useEffect → useCartItemsQuery, useCartItemMutation으로 리팩토링
    - [x] ProductList
      - useProducts 훅 수정
        - useEffect → useInfiniteQuery로 리팩토링
    - [x] Header
      - CartItemsContext → useCartItemsQuery로 리팩토링
  - [x] useCartItemMutation 리팩토링
    - 내부적으로 각각의 mutation 분리하기
    - onError 핸들링 (useErrorContext)
