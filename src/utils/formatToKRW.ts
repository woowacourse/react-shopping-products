type KRWString = string;

export const formatToKRW = (value: number): KRWString => {
  return `${value.toLocaleString("ko-KR")}원`;
};
