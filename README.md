# 상품 목록

> react-shopping-products
> FE 레벨2 상품 목록 미션

[🔗 웹페이지 배포 주소](https://shinjungoh.github.io/react-shopping-products)

<br>

## 🎯 기능 요구 사항

## [Step2] 🎨 2단계

MSW를 이용해 서버의 다양한 응답을 시뮬레이션하고, 그 시나리오에 따른 UI 처리 및 테스트를 구현할 수 있다.

### 1. 상품 목록 섹션

- [x] 상품 목록에서 담기 버튼을 누르면, 수량을 조절할 수 있다.
- [x] 상품의 수량이 0이면 품절 UI를 보여준다.
- [x] 상품의 현재 수량을 초과하여 담지 못하게 한다.
  - [x] step1에서 구현해둔 에러 메시지를 표시하는 UI를 그대로 활용하여 표시한다.

### 2. 장바구니 모달

- [x] 장바구니 버튼을 클릭하면 모달로 장바구니에 담은 목록을 확인할 수 있어야 한다.
- [x] 모달에서 장바구니 수량을 조절할 수 있어야 한다.

## [Step1] 🎨 1단계

### 1. 💳 상품 목록 조회

- [x] 상품 목록 섹션에 최대 20개의 상품을 보여준다.
  - ex. 전체 카테고리 size 20개로 요청, 세부 카테고리 size 20개로 요청

### 2. 상품 정렬 및 필터링

- [x] 상품을 카테고리에 따라 필터링한다.
  - [x] 카테고리는 "식료품", "패션잡화" 로 한정한다.
- [x] 상품을 가격에 따라 정렬한다.
  - [x] 낮은 가격 순
  - [x] 높은 가격 순

### 3. 상품 장바구니 담기

- [x] 사용자가 담기 버튼을 누르면, 장바구니에 추가된다.
- [x] 장바구니에 담긴 아이템 '종류'의 개수로 숫자를 표시한다.
  - 아이템의 종류는 id 로 판단한다.
  - 전체 장바구니에 1개의 아이템을 100개 담았다고 했을 때, 1개로 표시한다.
- [x] 장바구니 담기 요청 중 에러가 발생한 경우, 에러 메시지를 사용자에게 알려주는 UI를 표시한다.
- [x] 장바구니에서 빼기 버튼을 누르면, 장바구니에서 해당 아이템이 제거된다.
- [x] 장바구니에 담긴 아이템 종류의 최대 개수는 50개이다.

<br>

## ✅ 프로그래밍 요구사항

## [Step2] 🎨 2단계

- Data fetching hook

  - [x] 서버 API 통신 결과를 Single Source of Truth (SSOT) 원칙에 따라 관리할 수 있도록, 커스텀 훅을 직접 개발한다.
  - [x] GET method를 사용하는 모든 API에 이 커스텀 훅을 적용한다.
    - [x] GET /cart-items , GET /products API를 통일된 인터페이스로 data fetching 할 수 있어야 한다.
    - [x] ex) useData, useResource 등의 이름으로 선언할 수 있다.
  - [x] 반환값에는 데이터, 로딩 여부, 에러 정보 등이 포함되어야 한다.
  - [x] Context API를 활용한다. 단, API 마다 Provider를 따로 만들지 않고, 하나의 Context에서 관리할 수 있어야 한다.
    - Context API 사용으로 인한 렌더링 문제는 해결하지 않아도 된다. 문제점은 학습하여 인지하도록 한다.
  - [x] 상용 라이브러리의 인터페이스를 그대로 모방하지 않는다. 구조를 직접 설계한다.

- MSW

  - [x] 안정적인 테스트 환경을 만들기 위해 MSW를 사용한다.
    - [ ] 서버 API의 다양한 케이스를 MSW와 RTL을 활용하여 테스트한다.
  - [x] 서버 API를 시뮬레이션 하기 위해 MSW를 사용한다.
    - [x] 서버 API에서 아직 구현되지 않은 부분을 MSW를 통해 미리 테스트해본다. 
  - 서버와 협의했지만, 서버가 구현되지 않은 API 스펙은 다음과 같다.

```
1. 모든 API 의 상품 타입에 남은 수량(quantity) 필드 추가

GET /products/{id}
{
  "id": 1,
  "name": "에어포스",
  "price": 100000
  "imageUrl": "string",
  "category": "string",
  "quantity": 50
}


2. 재고를 초과하여 장바구니를 담으려고 하면 에러 발생

POST /cart-items
400 Bad Request
Content-Type: application/json
{
  "errorCode": "OUT_OF_STOCK",
  "message": "재고 수량을 초과하여 담을 수 없습니다.",
}

3. PATCH /cart-items/{id} 도 위와 동일
```

- 배포 

  - [x] 리뷰어가 쉽게 확인할 수 있도록, 개발환경 뿐만 아니라, 프로덕션 환경에서도 MSW를 start 한다.

- Library

  - [x]스타일링에는 CSS Module, styled-components, emotion 중 한 가지를 선택하여 사용한다.
  - [x]명시된 라이브러리 외에는 사용하지 않고 직접 구현한다.


## [Step1] 🎨 1단계

- API 명세

  - API 명세(Swagger)를 참고하여, 상품 목록 데이터, 장바구니 데이터를 불러오고 수정한다.
  - 관리자 페이지에서 상품 추가 및 삭제가 가능하다.
  - 설정을 확인할 수 있다.
  - 계정 정보
    - email: github username, password: 'password'
  - [x] GET /products API 에서, 정렬(sort)은 {sortKey},{sortOrder}형식으로 요청한다.
    - ex) price,asc
    - sortKey 에는 price, name, id 등 상품이 가지는 속성이 들어가고, sortOrder 는 asc, desc 가 들어간다.
    - sort 가 여러개의 기준을 가질 수 있다.
      - ex) ["price,asc", "id,desc"]
    - [x] 가격은 오름차순, 가격이 동일하다면 id 내림차순

- API

  - [x] API 요청 중에는 로딩 상태를 나타내는 UI (예: 텍스트 메시지, 스피너, 스켈레톤 등)를 표시한다.
  - [x] API 요청 중 에러가 발생한 경우, 에러 메시지를 사용자에게 알려주는 UI를 표시한다.
  - [x] 장바구니 개수는 /cart-items/count API 를 사용하지 않는다. /cart-items 의 응답에서 추출한다. page=1, size=50 으로 요청하도록 한다.

- Test

  - [x] RTL을 활용하여 주요 기능 플로우에 대한 테스트를 작성한다.
  - API 요청이 포함된 컴포넌트의 테스트가 어려운 경우, 다음 순서를 고려한다.
    - [x] 테스트가 가능한 컴포넌트 단위로 분리하거나, 작은 단위의 테스트를 먼저 고민한다.
    - [x] 간단한 수준의 API Mocking으로 흐름 테스트를 구성한다. (jest.fn, jest.spyOn 등)
    - 위 방식이 어렵게 느껴진다면 실제 API를 직접 호출하여 테스트해도 무방하다.

- Library
  - [x] 스타일링에는 CSS Module, styled-components, emotion 중 한 가지를 선택하여 사용한다.
  - [x] 명시된 라이브러리 외에는 사용하지 않고 직접 구현한다.

<br>

## 📝 커밋 메시지

- feat : 새로운 기능을 추가한 경우
- fix : 버그 수정
- docs : 문서를 수정한 경우
- style : 코드 스타일, 포멧, 주석을 변경
- design: CSS 등 사용자 UI 디자인 변경
- refactor : 코드 리팩토링
- test : 테스트 관련 코드를 수정한 경우
- chore : 코드 수정이 아닌, 단순 폴더명 파일명 등을 수정한 경우
- remove: 파일이나 로직을 삭제한 경우
