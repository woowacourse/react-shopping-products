export default function convertToLocaleAmount(amount: number) {
  return `${amount.toLocaleString("ko-KR")}원`;
}
