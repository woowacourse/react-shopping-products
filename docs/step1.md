# 기능 구현 타임라인

## step 1 - 상품 목록 20개 조회

### 핵심 기능

> msw로 모킹한 것을 바탕으로 상품 목록 20개를 화면에 보여준다.

### 세부 기능 구현 목록

- [v] msw 세팅을 진행
- [v] useFetch hook과 useProductItems hook 구현
- [v] 상품 목록 20개 조회 테스트

## step 2 - 컴포넌트 마크업

### 핵심 기능

> 전체적인 상품 목록 페이지의 보여지는 부분을 화면에 구현한다.

### 세부 기능 구현 목록

- [v] 공통 컴포넌트
  - [v] Dropdown
  - [v] Navigation
- [v] 도메인 컴포넌트
  - [v] CategoryDropdown
  - [v] SortDropdown
  - [v] Card

## step 3 - 상품 장바구니 담기 기능 구현

### 핵심 기능

> 빼기 버튼을 누르면 우측 상단 장바구니 ui의 갯수가 마이너스 된 후 담기 버튼으로 변경
>
> 사용자가 담기 버튼을 누르면, 우측 상단 장바구니 ui의 갯수가 추가된 후 빼기 버튼으로 변경

## step 4 - 상품 목록 무한 스크롤 기능 구현

### 핵심 기능

> 상품 목록이 최하단에 도달하면 4개씩 추가적으로 상품 목록을 보여준다.

- [v] useIntersectionObserver 구현
- [v] useProducts 내 updateNextPage 추가
- [v] ProductPage 내 무한 스크롤 기능 구현

## step 5 - 상품 목록 fallback ui 구현

### 핵심 기능

> 에러, 로딩 상태에 대한 fallback ui를 구현한다.

### 세부 기능 구현 목록

- []

## step 6 - 상품 필터링 & 정렬 기능 구현

### 핵심 기능

> 카테고리 및 낮은 가격순 & 높은 가격순을 각각 눌렀을 때, 정렬 순서대로 ui들이 화면에 보여져야 한다.
