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
  - [x] 장바구니에 상품 담기
    - [x] 장바구니에 담긴 아이템 종류의 갯수로 숫자를 표시한다.
    - [x] 장바구니에 상품 빼기

- Test
  - [x] useProducts 훅
    - [x] 상품 목록 조회
  - [x] usePagination 훅
    - [x] 페이지네이션

### step2 기능 요구사항

- 핵심 기능

  - react query를 이용해서 장바구니에 상품을 추가/삭제할 수 있다.

- UI

  - [x] CountButton : 수량 조절 +/- 버튼
  - [x] CartModal : 장바구니 모달
    - [x] CartItem : 상품 이미지, 이름, 가격, 수량 조절 +/- 버튼, 삭제 버튼
    - [x] CartTotalPrice: 총 결제 금액
    - [x] 닫기 버튼

- 기능
  - [x] 상품 목록
    - [x] 상품 목록에서 담기 버튼을 누르면, 수량을 조절할 수 있다.
  - [x] 장바구니
    - [x] 장바구니 담기: 상품을 장바구니에 담는 기능을 구현하고 장바구니 상태를 업데이트한다
    - [x] 장바구니 모달: 장바구니 버튼을 클릭하면 모달로 장바구니에 담은 목록을 확인할 수 있어야 한다.
    - [x] 장바구니에서도 수량을 조절할 수 있어야 한다.
