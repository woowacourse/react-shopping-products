export const ERROR_MESSAGE = {
  SYSTEM_FAULT: 'system error. 관리자에게 문의하십시오',
  OFFLINE: '네트워크 연결이 끊어졌습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
  UNKNOWN: '알 수 없는 에러입니다. 관리자에게 문의해주세요. (연락처...)',
};

export const SERVER_ERROR_MESSAGE_DIVIDER = ';';

export const SERVER_ERROR_MESSAGE = {
  PRODUCT_NOT_FOUND: '해당하는 상품을 찾을 수 없어요.',
  CARTITEM_NOT_FOUND: '해당되는 장바구니 상품이 장바구니에 포함되어있지 않아요.',
  MEMBER_NOT_FOUND: '아이디가 잘못되었어요.',
  PASSWORD_IS_NOT_CORRECT: '비밀번호가 잘못되었어요.',
  AUTHORIZATION_HEADER: '현재 로그아웃 상태에요.',
  CARTITEM_ALREADY_EXISTS: '해당하는 상품은 이미 장바구니에 담겨있어요.',
};

// 엔드포인트 자체에 대한 오류 메세지
export const REQUEST_CART_ITEMS_ERROR_MESSAGE = {
  GET_CART_ITEMS: '장바구니 목록을 불러올 수 없어요. ',
  ADD_CART_ITEM: '장바구니에 상품을 추가할 수 없어요.',
  DELETE_CART_ITEM: '장바구니에 상품을 제거할 수 없어요.',
  MODIFY_CART_ITEM: '장바구니 상품의 수량을 변경할 수 없어요.',
};

export const REQUEST_PRODUCTS_ERROR_MESSAGE = {
  GET_PRODUCT_LIST: '상품 목록을 불러올 수 없어요.',
};
