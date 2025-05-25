## 🚀 상품 목록 2단계

### 🔑 키워드

- Advanced Data fetching
- MSW

### 📍 학습 목표

- Single Source Of Truth 를 지향하며 일관된 인터페이스를 가진 Data fetching hook 을 구현한다.
- MSW를 이용해 서버의 다양한 응답을 시뮬레이션하고, 그 시나리오에 따른 UI 처리 및 테스트를 구현할 수 있다.

### 🎯 기능 요구 사항

1. 상품 목록 섹션
   상품 목록에서 담기 버튼을 누르면, 수량을 조절할 수 있다.
   상품의 수량이 0 이면, 품절 UI 를 보여준다.
   상품의 현재 수량을 초과하여 담지 못하게 한다.
   step1 에서 구현해둔 에러 메시지를 표시하는 UI 를 그대로 활용하여 표시한다.
2. 장바구니 모달
   장바구니 버튼을 클릭하면 모달로 장바구니에 담은 목록을 확인할 수 있어야 한다.
   모달에서 장바구니 수량을 조절할 수 있어야 한다.

고민 사항

- 지금 현재 data와 관련된 로직을 탠스택 쿼리와 비슷하게 구성을 해볼까하는데, 이게 상용라이브러리의 인터페이스를 따라하는게 아닐까? 라는 생각이든다.
- 그럼 이걸 어떻게 해결하는 것이 의미가 있는 걸까?
  -> 단순 fetch는 그냥 써도 되지 않을까? refetch는 그럼 어떻게 관리하는 것일까?
  지금 추상화한 방식은 잘못된걸까?

### 1단계 미비된 리팩토링 사항

- [x] productCard 컴포넌트에 기본 html 태그 타입 입히기 (style, className 주입할 수 있도록)
- [x] sort 및 filter api 요청으로 변경
- [x] 데이터 전역에서 관리하기 -> data fetch 로직
  - [x] loading, error, data 한 번에 관리하기
    - [x] loading 및 error는 우선 전역상태랑 함께 관리
  - [x] provider 추상화
    - [x] provider 내부에서 정적 데이터 관리 (상태 x)
  - [x] provider 전체 렌더링 -> 각각의 컴포넌트에서만 렌더링

### 기능 명세서

- [x] msw 적용하기

  - [x] 서비스 워커 등록
  - [x] msw 에서 사용할 모킹 데이터 구현
    - [x] 프로덕트 데이터 구현 (+quantity 추가되어야함.)
    - [x] 장바구니 데이터 구현
  - [x] msw api 로직 구현
    - [x] products api
    - [x] cartItem api
      - [x] get (장바구니 조회)
      - [x] post (장바구니 담기)
      - [x] patch (장바구니 업데이트)
      - [x] delete (장바구니 삭제)
  - [x] msw 연결
    - [x] products api 로직 연결 (sort, category)
    - [x] cartItem api 로직 연결

- [ ] 상품 목록
  - [x] 장바구니 ui 변경 -> 담기 버튼 클릭시, 갯수 올리는 ui로 변경
    - [x] quantitySelector 컴포넌트 제작
  - [x] 장바구니 갯수 조절 로직
    - [x] patch api 연결
      - [x] 0으로 업데이트할 경우, 장바구니에서 사라진다.!
  - [x] 품절 ui 구현
    - [x] 품절 상품일 시, 구매버튼 제어 -> disabled
- [x] 모달 구현
  - [x] npm i hoyychoi-modal-component 사용
  - [x] 모달 내부 ui 구현
    - [x] cartItemCard component 제작
    - [x] 버튼 컴포넌트
    - [x] 내부 삭제 및 닫기 버튼
  - [x] 모달 내부 로직 구현
    - [x] 갯수 변경 로직
    - [x] 삭제 로직
    - [x] 총합 로직
  - [x] product quantity 대비 -> cart에 담는 수 제한
    - [x] api 에러로 제한 -> throw new Error 메시지
  - [x] cartModal 상태 전역에서 관리
  - [x] cartModal context 생성
  - [x] cartModal Component 상위에서 관리

테스트 코드

- [ ] vi.mock -> msw 바탕 테스트 코드로 수정
- [ ] useProducts
- [ ] useCartItems
  - [ ] post (장바구니 처음 담기)
  - [ ] patch (장바구니 갯수)
    - [ ] 담는 수 제한 에러 확인
  - [ ] delete (장바구니 삭제)
