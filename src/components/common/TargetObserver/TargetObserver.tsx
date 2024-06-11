import useIntersectionObserver from '@hooks/useIntersectionObserver';
import * as Styled from './TargetObserver.styled';

const TargetObserver = <T extends (...args: unknown[]) => void>({
  children,
  onIntersect,
}: React.PropsWithChildren<{ onIntersect: T }>) => {
  const targetRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: () => {
      onIntersect();
    },
  });

  return (
    <>
      {children}
      <Styled.ObserverTarget ref={targetRef} />
    </>
  );
};

export default TargetObserver;
