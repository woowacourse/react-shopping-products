interface BassicTokenProps {
  userId: string;
  userPassword: string;
}

export function generateBasicToken({ userId, userPassword }: BassicTokenProps) {
  const token = btoa(`${userId}:${userPassword}`);
  return `Basic ${token}`;
}
