const userId = import.meta.env.VITE_USER_ID;
const password = import.meta.env.VITE_PASSWORD;

if (!userId || !password) {
  console.error(
    "Auth 키가 설정되지 않았습니다. .env 파일을 확인하세요. VITE_USER_ID와 VITE_PASSWORD를 설정해야 합니다."
  );
}

const authHeader =
  userId && password ? `Basic ${btoa(`${userId}:${password}`)}` : "";

export const commonOpts = {
  headers: {
    Authorization: authHeader,
    "Content-Type": "application/json",
  },
};
