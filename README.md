# 🛠 1단계 피드백 반영, 리팩토링

- 피드백 반영

- [x] 과도한 주석 제거
- [x] showToast 메서드에서 메시지 뿐만 아니라 메시지 지속 시간도 인자로 …
- [x] idMap->productToCartIdMap으로 변수명 변경, 타입 구체화
- [x] 이전 값을 참조해 setState 시, callback을 활용하도록 수정
- [x] useInfinityScroll을 더 general하게 만들기 - onIntersect와 threshold를 인자로 받도록
- [x] productToCartIdMap을 useEffect가 아닌 cartItems를 fetch 해올 때 업데이트
- [x] useCartItems에서 showToast 메서드 제거
- [x] request header를 유연하게 수정, makeRequest 파일 분리, 중복 의미 주석 제거
- [x] API 요청 시, URLSearchParams 활용하기

- 리팩토링
- [x] hasMore가 아닌 response의 last 값을 사용해 마지막 페이지 판단, 요청 한번 줄이기
- [x] useProductFetch에서 setPage를 return하지 말고 page를 넘기는 메서드를 useEffect에서 분리, return값으로 넘기기

# 🎯1단계 기능 요구사항

### step 7 - 상품 선택 상태에 따른 장바구니 담기, 빼기 API 요청 기능

- [x] 장바구니 목록 GET 요청으로 상품 ID와 장바구니 ID 가져오기
  - [x] 장바구니에 담긴 상품을 클라이언트 selectedItems 상태와 동기화
- [x] 상품 선택 상태에 따른 장바구니 담기 API POST 요청 (상품의 ID 사용)
- [x] 상품 선택 상태에 따른 장바구니 빼기 API DELETE 요청 (장바구니의 ID 사용)

### step 6 - 상품 정렬, 필터링 상태에 따른 query 요청

- [x] 카테고리에 따른 상품 정렬 query 요청
- [x] 가격에 따른 상품 정렬 query 요청

### step 5 - 무한스크롤 기능 개발

- [x] 화면 맨 끝에 도달하면 다음 data page의 fetch 요청
  - [x] 맨 처음 20개를 불러온 이후, 추가로는 4개씩 fetch

### step 4 - 비동기 요청 에러, 로딩 처리

- [x] 비동기 요청 중 에러가 발생하면 보여줄 에러 토스트 메시지 컴포넌트
- [x] Context API를 활용한 에러 토스트 메시지 상태 관리 및 렌더링
- [x] 비동기 요청 로딩 상태를 나타내는 로더 컴포넌트

### step 3 - 상품 목록 불러오는 useProducts 기능 개발

- [x] 초기 렌더링 시, 쿼리 없이 전체 목록 중 20개의 상품 목록을 가져오는 기능
  - [x] products를 GET 해오는 fetchProducts 함수 작성
  - [x] useProducts - products 상태를 갖고 fetchProducts 하는 커스텀 훅 작성
  - [x] fetch 요청을 MSW로 모킹 후, 20개의 상품 목록을 가져오는 test 파일 작성
- [x] useProducts 커스텀 훅을 ProductItemList 컴포넌트에서 mock데이터를 대체

### step 2 - 상태 관리

- [x] 선택된 상품 ID 목록 상태
- [x] 장바구니 담긴 상품 갯수 상태
- [x] SelectBar category, sort 조건 상태

### step 1 - ProductListPage UI 작업

- [x] Header 공용 컴포넌트
- [x] Button 공용 컴포넌트
- [x] Title 공용 컴포넌트
- [x] Select 공용 컴포넌트

- [x] ProductListPage 컴포넌트 생성
- [x] reset.css, app 레이아웃 index.css 적용
- [x] ProductListHeader 컴포넌트 생성
- [x] ProductListTitle 컴포넌트 생성
- [x] ProductListSelectBar 컴포넌트 생성
- [x] ProductSelectButton 컴포넌트 생성
- [x] ProductItem 컴포넌트 생성
- [x] ProductItemList 컴포넌트 생성
- [x] cartItemCount UI 생성

### 컨벤션

- 컴포넌트 형식 : React arrow function component export default
- css : module 방식
