# 기능 구현 타임라인

## step 1 - useProducts react query로 마이그레이션

### 핵심 기능

> useProducts 내 상품 목록을 불러오는 로직을 react query로 마이그레이션 한다.

### 세부 기능 구현 목록

- [ ] react query 초기 세팅(queryClient 내 전역 onError 로직 설정)
- [ ] useProducts 내 useFetch를 useSuspenseQuery로 변경
  - [ ] 초기 상품 목록을 잘 불러오는지 확인
  - [ ] 상품 목록을 가져오기 전 fallback ui를 잘 보여주는지 확인
  - [ ] 상품 필터링 & 정렬 잘 되는지 확인
- [ ] 기존 테스트 코드를 잘 통과하는지 확인

## step 2 - 상품 목록 가져올 때의 예외 처리 로직 개선

### 핵심 기능

> 기존 예외 처리 로직을 React Query + ErrorBoundary로 개선한다.

### 세부 기능 구현 목록

- [ ] react-error-boundary 의존성 설치
- [ ] QueryErrorBoundary 컴포넌트 구현
- [ ] 상품 목록 가져오기 예외 처리 로직을 ErrorBoundary로 변경

## step 3 - 무한 스크롤 react query로 개선

### 핵심 기능

> 무한 스크롤 하는 로직을 react query로 변경

### 세부 기능 구현 목록

## step 4 - 장바구니 수량 조절 기능

### 핵심 기능

> 담기 버튼을 눌렀을 때 장바구니 수량을 조절할 수 있어야 한다.

### 세부 기능 구현 목록

## step 5 - 장바구니 담은 목록 확인 기능

### 핵심 기능

> 장바구니 버튼을 클릭 시 모달로 장바구니에 담은 목록을 확인할 수 있어야 한다.

### 세부 기능 구현 목록
