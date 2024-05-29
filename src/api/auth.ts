const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;

const token = generateBasicToken(USER_ID, USER_PASSWORD);

export const AUTH_HEADER: Record<string, string> = {
  Authorization: token,
  'Content-Type': 'application/json',
};

export function generateBasicToken(userId: string, userPassword: string): string {
  const token = btoa(`${userId}:${userPassword}`);

  return `Basic ${token}`;
}
