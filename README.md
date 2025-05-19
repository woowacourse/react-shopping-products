# react-shopping-products

## 리팩토링 및 수정 사항

- [ ] Card 컴포넌트 리팩토링

  - [x] App 컴포넌트에서 card 컴포넌트 분리 -> productList 컴포너트 제작
  - [x] Select 컴포넌트 options 값 상수로 관리
  - [x] options 값들 타입 처리 및 반영
  - [x] Card 컴포넌트 역할 증가 시키기 -> 네이밍 도메인에 직관적으로
  - [x] filter 및 sort product훅 내부에서 관리

- [ ] API 호출

  - [x] 공통 BASE API 파일 생성
  - [x] API 분리
  - [x] API 요청 시, 로딩 및 에러 관리
    - [x] 로딩 : context api로 상위에서 관리
    - [x] 에러 : context api로 상위에서 관리
  - [x] 데이터 저장 시, 서버데이터 전체 저장
    - [x] -> 화면에서 사용할 값만 따로 저장 (가공하는 로직 생성)

- [x] Button 컴포넌트 props 변경
  - [x] props -> icon => 실제 이미지 넣기 (컴포넌트)
  - [x] props -> icon 위치

```jsx
interface ButtonProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: 'primary' | 'outline';
  onClick?: () => void;
}



<Button icon={<AddCart />} iconPosition="left">
  담기
</Button>
```

- [x] RTL 테스트 코드 수정
  - [x] api 호출 모킹 데이터로 테스트 하기
    - [x] useProducts
      - [x] 모킹데이터 추가
    - [x] useCartItems
