  it('상품 아이템 장바구니 삭제 버튼 클릭 시 장바구니에서 삭제된다.', async () => {
    const mockCartContextValue = {
      cartList: [],
      fetchCartList: vi.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartContext.Provider value={mockCartContextValue}>
        {children}
      </CartContext.Provider>
    );
    const { result } = renderHook(() => useProductSelector(productId), {
      wrapper,
    });

    server.use(...deleteCartItemHandler);
    console.log(mockCartContextValue.cartList);
    await act(async () => {
      await result.current.removeCartItem();
    });

    expect(mockCartContextValue.fetchCartList).toHaveBeenCalled();
    expect(result.current.isSelected).toBe(false);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
