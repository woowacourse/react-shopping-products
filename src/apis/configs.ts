export const SHOP_API = {
  baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
  endpoint: {
    products: "products",
    cartItems: "cart-items",
  },
};

export const createApiUrl = (
  endpoint: string,
  params?: Record<string, string | number>
) => {
  const searchParams = new URLSearchParams();

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      searchParams.append(key, String(value));
    }
  }

  const baseUrl = `${SHOP_API.baseUrl}/${endpoint}`;
  const query = searchParams.toString();

  return query ? `${baseUrl}?${query}` : baseUrl;
};

export const fetchWithErrorHandling = async <T>(
  url: string,
  options?: RequestInit,
  parseJson: boolean = true
): Promise<T | { error: string } | void> => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      switch (response.status) {
        case 400:
          return { error: "잘못된 요청입니다. 입력값을 다시 확인해주세요." };
        case 401:
          return { error: "인증이 필요합니다. 로그인 후 다시 시도해주세요." };
        case 403:
          return { error: "접근이 거부되었습니다. 권한을 확인해주세요." };
        case 404:
          return { error: "요청한 리소스를 찾을 수 없습니다." };
        case 500:
          return {
            error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
          };
        default:
          return { error: `에러가 발생했습니다. (코드: ${response.status})` };
      }
    }

    if (parseJson) return response.json();
    return;
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: `에러가 발생했습니다: ${error.message}`,
      };
    }

    return {
      error: "예기치 못한 오류가 발생했습니다. 다시 시도해주세요.",
    };
  }
};
