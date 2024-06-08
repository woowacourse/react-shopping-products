import React, {
  PropsWithChildren,
  useState,
  useEffect,
  useRef,
  ReactElement,
  ReactNode,
} from 'react';

interface FallbackImageLoaderProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackComponent: ReactNode;
}

const FallbackImageLoader: React.FC<
  PropsWithChildren<FallbackImageLoaderProps>
> = ({ fallbackComponent, children, ...props }) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsError(false);
  }, [props.src]);

  const handleError = () => {
    setIsError(true);
  };

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        if (entries[0].contentRect) {
          setDimensions({
            width: entries[0].contentRect.width,
            height: entries[0].contentRect.height,
          });
        }
      });

      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [containerRef.current]);

  const childWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as ReactElement, {
        onError: handleError,
        ...props,
      });
    }
    return child;
  });

  if (isError) {
    return (
      <div
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
        }}
      >
        {React.cloneElement(fallbackComponent as ReactElement, {
          style: { width: '100%', height: '100%' },
        })}
      </div>
    );
  }

  return <div ref={containerRef}>{childWithProps}</div>;
};

export default FallbackImageLoader;
