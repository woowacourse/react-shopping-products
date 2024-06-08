import { BlankCart } from '@/assets/index';
import { FallbackCartContainer } from './FallbackCart.style';

const FallbackCart: React.FC<{ message: string }> = ({ message }) => {
  return (
    <FallbackCartContainer>
      <img src={BlankCart} />
      <p>{message}</p>
    </FallbackCartContainer>
  );
};
export default FallbackCart;
