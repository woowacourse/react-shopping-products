import { Navigation } from '@components/common';

import * as Styled from './AppLayout.styled';
import { ShoppingCart } from '@assets/svg';
import { useState } from 'react';
import ShoppingCartConfirmBottomSheet from '@components/shoppingCart/ShoppingCartConfirmBottomSheet/ShoppingCartConfirmBottomSheet';
import useShoppingCart from '@queries/shoppingCart/useShoppingCart';

const AppLayout = ({ children }: React.PropsWithChildren) => {
  const [isBottomSheetToggle, setIsBottomSheetToggle] = useState(false);

  const { addedShoppingCartLength } = useShoppingCart();
  return (
    <Styled.AppLayoutWrapper>
      <Navigation>
        <Styled.ShoppingCartButton
          onClick={() => setIsBottomSheetToggle((prev) => !prev)}
          style={{ position: 'relative' }}
        >
          <ShoppingCart />
          {addedShoppingCartLength > 0 && <Styled.Circle>{addedShoppingCartLength}</Styled.Circle>}
        </Styled.ShoppingCartButton>
      </Navigation>
      <Styled.LayoutWrapper>{children}</Styled.LayoutWrapper>
      {isBottomSheetToggle && (
        <ShoppingCartConfirmBottomSheet
          isOpen={isBottomSheetToggle}
          onToggle={() => setIsBottomSheetToggle((prev) => !prev)}
        />
      )}
    </Styled.AppLayoutWrapper>
  );
};

export default AppLayout;
