import { render, screen } from '@testing-library/react';
import Header from '../src/components/header/Header';

describe('Header 컴포넌트', () => {
  it('cartItemCount가 전달되어 숫자가 보인다', () => {
    render(<Header cartItemCount={5} handleOpenModal={() => {}} />);
    const cartCount = screen.queryByText('5');
    expect(cartCount).toBeTruthy();
  });

  it('cartItemCount가 0이면 숫자가 표시되지 않는다', () => {
    render(<Header cartItemCount={0} handleOpenModal={() => {}} />);
    const badge = screen.queryByText('0');
    expect(badge).toBeNull();
  });
});
