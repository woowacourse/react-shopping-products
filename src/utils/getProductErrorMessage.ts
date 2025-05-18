export const getProductErrorMessage = (status: number | null) => {
  const messages: Record<number, string> = {
    400: '상품 정보를 불러올 수 없습니다.',
    404: '상품을 찾을 수 없습니다.',
    500: '상품 서버에 문제가 발생했습니다.',
  };

  return status !== null && messages[status]
    ? messages[status]
    : '알 수 없는 상품 오류가 발생했습니다.';
};

export default getProductErrorMessage;
