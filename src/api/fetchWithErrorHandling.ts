const fetchWithErrorHandling = async (
  endPoint: string,
  options?: RequestInit
) => {
  const url = `${import.meta.env.VITE_BASE_URL}${endPoint}`;
  const response = await fetch(url, {
    ...options,
  });

  const status = response.status;
  const contentType = response.headers.get("Content-Type") || "";

  let errorBody = null;

  if (contentType.includes("application/json")) {
    errorBody = await response.json();
  }

  if (!response.ok) {
    return {
      data: null,
      error: {
        code: status,
        errorCode: errorBody?.errorCode || "",
        message: errorBody?.message || getErrorMessage(status),
      },
    };
  }

  return {
    data: errorBody,
    error: null,
  };
};

const getErrorMessage = (status: number): string => {
  if (status === 400) return "잘못된 요청입니다. 다시 시도해주세요.";
  if (status === 404) return "요청하신 정보를 찾을 수 없습니다.";
  if (status === 500) return "서버에 문제가 발생했습니다.";
  return "알 수 없는 오류가 발생했습니다.";
};

export default fetchWithErrorHandling;
