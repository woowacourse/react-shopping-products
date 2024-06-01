const ERROR_MESSAGE = {
  FAIL_FETCH: '서버에 요청하는 데에 실패했어요!',
  NOT_DEFINED_CONTEXT: '컨텍스트 프로바이더가 정의되지 않았습니다.',
  MAX_CART_LENGTH: '최대 장바구니 갯수는 50개에요!',
  FAIL_ADD_CART_ITEM: '장바구니 아이템을 추가하는데에 실패했어요!',
  FAIL_DELETE_CART_ITEM: '장바구니 아이템을 삭제하는데에 실패했어요!',
  WRONG_CATEGORY: '잘못 된 카테고리에요!',
  WRONG_SORT_TYPE: '잘못 된 분류 값이에요!',
} as const;

export default ERROR_MESSAGE;
