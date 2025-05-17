const getCartErrorMessage = (status: number | null) => {
  const messages: Record<number, string> = {
    400: '장바구니 요청이 잘못되었습니다.',
    401: '장바구니에 접근할 수 있는 권한이 없습니다.',
    403: '장바구니에 접근할 수 있는 권한이 없습니다.',
    404: '장바구니 항목을 찾을 수 없습니다.',
    500: '장바구니 처리 중 서버 오류가 발생했습니다.',
  };

  return status !== null && messages[status]
    ? messages[status]
    : '알 수 없는 장바구니 오류가 발생했습니다.';
};

export default getCartErrorMessage;
