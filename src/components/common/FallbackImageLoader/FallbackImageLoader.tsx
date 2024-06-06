import FallbackImage from '@/components/Fallbacks/FallbackImage/FallbackImage';
import React, {
  PropsWithChildren,
  useState,
  useEffect,
  ReactElement,
} from 'react';

const FallbackImageLoader: React.FC<
  PropsWithChildren<React.ImgHTMLAttributes<HTMLImageElement>>
> = ({ children, ...props }) => {
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsError(false);
  }, [props.src]);

  const handleError = () => {
    setIsError(true);
  };

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
    return <FallbackImage />;
  }

  return <>{childWithProps}</>;
};

export default FallbackImageLoader;
