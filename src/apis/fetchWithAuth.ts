import { generateBasicToken } from "../util/auth";

const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;
const USER_ID = import.meta.env.VITE_USER_ID;
const token = generateBasicToken(USER_ID, USER_PASSWORD);

async function fetchWithAuth(url: string, method: string, body?: any) {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new Error("잘못된 요청입니다.");
        case 401:
          throw new Error("인증에 실패하였습니다.");
        case 403:
          throw new Error("접근 권한이 없습니다.");
        case 404:
          throw new Error("요청한 리소스를 찾을 수 없습니다.");
        case 500:
          throw new Error("서버 오류가 발생했습니다.");
        default:
          throw new Error("알 수 없는 오류가 발생했습니다.");
      }
    }

    return response;
  } catch (error) {
    throw new Error("잘못된 요청입니다.");
  }
}

export default fetchWithAuth;
