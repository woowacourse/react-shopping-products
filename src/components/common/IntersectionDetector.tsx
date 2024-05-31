import useIntersectionObserver from "../../hooks/useIntersectionObserver";

interface IntersectionDetectorProps {
  onIntersected: () => void;
}

export const IntersectionDetector = ({ onIntersected }: IntersectionDetectorProps) => {
  const { setTarget } = useIntersectionObserver<HTMLDivElement>(onIntersected);

  return <div ref={setTarget} />;
};
