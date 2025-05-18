const fetchWithErrorHandling = async (
  endPoint: string,
  options?: RequestInit
) => {
  const url = `${import.meta.env.VITE_BASE_URL}${endPoint}`;
  const response = await fetch(url, {
    ...options,
  });

  const status = response.status;

  if (!response.ok) {
    return { newErrorMessage: "", data: null };
  }

  const contentType = response.headers.get("Content-Type") || "";

  if (contentType.includes("application/json")) {
    const data = await response.json();
    return { newErrorMessage: "", data };
  }

  const getErrorMessage = (status: number): string => {
    if (status === 400) {
      return "잘못된 요청입니다. 다시 시도해주세요.";
    }

    if (status === 404) {
      return "요청하신 정보를 찾을 수 없습니다.";
    }

    if (status === 500) {
      return "서버에 문제가 발생했습니다.";
    }

    return "";
  };

  return { newErrorMessage: getErrorMessage(status), data: null };
};

export default fetchWithErrorHandling;
