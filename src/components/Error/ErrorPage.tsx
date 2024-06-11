type Props = {
  resetErrorBoundary: () => void;
  message: string;
};

export default function ErrorPage({ resetErrorBoundary, message }: Props) {
  return (
    <div>
      {message}
      <button onClick={resetErrorBoundary}>다시 시도 하기</button>
    </div>
  );
}
