export const convertToUpperCase = (str: string) => {
  return str
    .split(' ') // 공백을 기준으로 단어를 나눔
    .map((word) => word.toUpperCase()) // 각 단어를 대문자로 변환
    .join('_');
};
