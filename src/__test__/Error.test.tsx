import { render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import { getProductList } from '@/api/product';
import { ProductListPage } from '@/features/ProductList';
import { ToastContext } from '@/shared/context/ToastProvider';

vi.mock('@/shared/components/Toast', () => ({
  Toast: {
    show: vi.fn(),
  },
}));

vi.mock('@/api/product', () => ({
  getProductList: vi.fn(),
}));

const renderWithToastContext = (ui: React.ReactElement, { showToast = vi.fn() } = {}) => {
  return render(<ToastContext.Provider value={{ showToast }}>{ui}</ToastContext.Provider>);
};

describe('ProductList', () => {
  it('401 에러 시 "인증되지 않은 사용자입니다." 메시지를 Toast로 표시한다', async () => {
    const showToastMock = vi.fn();

    (getProductList as ReturnType<typeof vi.fn>).mockRejectedValue({
      response: {
        status: 401,
        data: { message: '인증되지 않은 사용자입니다.' },
      },
      message: '인증되지 않은 사용자입니다.',
    });

    renderWithToastContext(<ProductListPage />, { showToast: showToastMock });

    await waitFor(() => {
      expect(showToastMock).toHaveBeenCalledWith('인증되지 않은 사용자입니다.');
    });
  });
});
