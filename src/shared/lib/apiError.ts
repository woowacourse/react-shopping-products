interface ApiErrorProps {
  status: number;
  message: string;
}

export const apiError = ({ status, message }: ApiErrorProps) => {
  return {
    status,
    message,
  };
};
