const ERROR_MESSAGE: Record<string, string> = {
  NO_INTERNET: '인터넷 오류입니다. 확인 후 다시 시도해주세요.',
  WRONG_REQUEST: '잘못된 요청입니다. 다시 시도해주세요.',
  OUT_OF_STOCK: '재고 수량을 초과하여 담을 수 없습니다.',
  NO_AUTH: '로그인 후 이용해주세요. 인증 정보가 확인되지 않았습니다.',
  WRONG_AUTH: '접근 권한이 없습니다. 관리자에게 문의해주세요.',
  NO_PAGE: '요청하신 페이지를 찾을 수 없습니다. 주소를 확인해주세요.',
  WRONG_SERVER: '서버에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  ADD_CART: '장바구니 추가 중 오류가 발생했습니다. 다시 시도해주세요.',
  REMOVE_CART: '장바구니 제거 중 오류가 발생했습니다. 다시 시도해주세요.',
  PATCH_CART: '장바구니 수량 변경 중 오류가 발생했습니다. 다시 시도해주세요.',
} as const;

export default ERROR_MESSAGE;
