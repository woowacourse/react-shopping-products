interface ErrorFallbackProps {
  message?: string;
}

function ErrorFallback({ message }: ErrorFallbackProps) {
  return (
    <>
      <div>오류가 발생했습니다.</div>
      <div>{message}</div>
    </>
  );
}

export default ErrorFallback;
