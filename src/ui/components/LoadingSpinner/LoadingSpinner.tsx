import { Spinner, Container } from './LoadingSpinner.styles';
import {woowaLogo} from "../../../assets";

export interface LoadingSpinnerProps {
  size?: number;
  duration?: number;
  alt?: string;
}

function LoadingSpinner({
  size,
  duration,
  alt = '로딩 중',
}: LoadingSpinnerProps) {
  return (
    <Container>
      <Spinner
        src={woowaLogo}
        alt={alt}
        size={size}
        duration={duration}
      />
    </Container>
  );
}

export default LoadingSpinner;
