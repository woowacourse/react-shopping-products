import { generateBasicToken } from "../util/auth";

const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;
const USER_ID = import.meta.env.VITE_USER_ID;
const token = generateBasicToken(USER_ID, USER_PASSWORD);

async function performFetch(url: string, method: string, body?: any) {
  let response;
  try {
    response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (networkError) {
    throw new Error("네트워크 연결이 불안정하거나 없습니다.");
  }

  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new Error("400: 잘못된 요청입니다.");
      case 401:
        throw new Error("401: 인증에 실패하였습니다.");
      case 403:
        throw new Error("403: 접근 권한이 없습니다.");
      case 404:
        throw new Error("404: 요청한 리소스를 찾을 수 없습니다.");
      case 500:
        throw new Error("500: 서버 오류가 발생했습니다.");
      default:
        throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  }

  return response;
}

async function fetchWithAuth(url: string, method: string, body?: any) {
  try {
    const response = await performFetch(url, method, body);
    if (!response) {
      throw new Error("응답을 받지 못했습니다.");
    }
    return response;
  } catch (error) {
    throw error;
  }
}

export default fetchWithAuth;
