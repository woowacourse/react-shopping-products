type ServerMessageMap = Record<string, string>;

const serverMessageMap: ServerMessageMap = {
  "존재하지 않는 상품입니다.": "장바구니에 해당 상품이 존재하지 않습니다.",
  "상품의 현재 수량을 초과할 수 없습니다.":
    "남은 재고보다 많은 수량은 담을 수 없습니다.",
  "상품 제거": "장바구니에서 상품이 제거되었습니다.",
  "삭제할 상품을 찾을 수 없습니다.": "삭제할 수 있는 상품이 없습니다.",
};

export const getFriendlyMessage = (
  serverMessage: string | undefined
): string => {
  if (serverMessage && serverMessage in serverMessageMap) {
    return serverMessageMap[serverMessage];
  }

  return (
    serverMessage ||
    "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
  );
};
