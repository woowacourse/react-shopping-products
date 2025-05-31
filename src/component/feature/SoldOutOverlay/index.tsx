import { ReactNode } from 'react';
import { productImageContainer, soldOutOverlay } from './SoldOutOverlay.styles';

interface SoldOutOverlayProps {
  children: ReactNode;
  isSoldOut: boolean;
}

const SoldOutOverlay = ({ children, isSoldOut }: SoldOutOverlayProps) => {
  return (
    <div css={productImageContainer}>
      {children}
      {isSoldOut && (
        <div css={soldOutOverlay}>
          <span>품절</span>
        </div>
      )}
    </div>
  );
};

export default SoldOutOverlay;
