const getErrorMessage = (status: number) => {
  switch (status) {
    case 400:
      return "유효하지 않은 요청입니다. 입력한 정보를 다시 확인해주세요.";
    case 404:
      return "요청한 정보를 찾을 수 없습니다.";
    case 500:
      return "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
    default:
      return "알 수 없는 오류가 발생했습니다.";
  }
};

export default getErrorMessage;
