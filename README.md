# react-shopping-products

### step1 기능 요구사항

- UI

  - [x] Header
    - [x] ShopButton
    - [x] CartButton
  - [x] Product
    - [x] ProductHeader
    - [x] Dropdown
    - [x] ProductList
    - [x] ProductItem
    - [x] CartActionButton(담기 / 빼기)
  - [x] LoadingSpinner : 로딩 상태 UI(스피너)
  - [x] ToastNotification : 에러 발생 UI(toastUI)

- 기능

  - [x] /products API를 MSW로 모킹한다.

    - [x] 상품 목록 데이터를 가져오기
    - [x] 다양한 응답 데이터(성공, 실패, 빈 데이터 등)를 대응한다.
      - 400 Bad Request
      - 404 Not Found
      - 500 Internal Server Error

  - [x] 상품 목록을 무한스크롤로 구현한다.
    - 처음 불러오는 갯수는 20개이다.
    - 이후 추가로 4개씩 불러온다.
  - [x] 상품을 카테고리별로 필터링한다.
    - fashion
    - beverage
    - electronics
    - kitchen
    - fitness
    - books
  - [x] 상품을 가격 순으로 정렬한다.
    - 낮은 가격 순 (asc)
    - 높은 가격 순 (desc)
  - [ ] 장바구니에 상품 담기

    - [x] 장바구니에 담긴 아이템 종류의 갯수로 숫자를 표시한다.

    - [ ] 장바구니에 상품 빼기

- Test
