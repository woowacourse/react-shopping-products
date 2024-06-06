type Props = {
  resetErrorBoundary: () => void;
};

export default function ErrorPage({ resetErrorBoundary }: Props) {
  return (
    <div>
      에러가 발생했어요!
      <button onClick={resetErrorBoundary}>다시 시도 하기</button>
    </div>
  );
}
