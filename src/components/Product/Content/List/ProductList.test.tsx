import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import ProductList from ".";
import { ProductItemType } from "@/apis/products/product.type";
import { CartItemProvider } from "@/contexts/CartItemProvider";

const mockProductItems = [
  {
    id: 1,
    name: "메이토",
    price: 1000,
    imageUrl: "3",
    category: "식료품",
    quantity: 0,
  },
  {
    id: 2,
    name: "토마토",
    price: 10000,
    imageUrl: "2",
    category: "식료품",
    quantity: 5,
  },
  {
    id: 3,
    name: "우비",
    price: 100000,
    imageUrl: "1",
    category: "패션잡화",
    quantity: 5,
  },
  {
    id: 4,
    name: "장바구니에서제거",
    price: 100000,
    imageUrl: "15",
    category: "패션잡화",
    quantity: 1,
  },
  {
    id: 5,
    name: "ㅇ_ㅇ",
    price: 1000,
    imageUrl: "3",
    category: "식료품",
    quantity: 5,
  },
] as ProductItemType[];

let { mockCartItems } = vi.hoisted(() => {
  return {
    mockCartItems: [
      {
        id: 1,
        quantity: 2,
        product: {
          id: 2,
          name: "토마토",
          price: 10000,
          imageUrl: "2",
          category: "식료품",
          quantity: 5,
        },
      },
      {
        id: 2,
        quantity: 2,
        product: {
          id: 3,
          name: "우비",
          price: 100000,
          imageUrl: "1",
          category: "패션잡화",
          quantity: 5,
        },
      },
      {
        id: 3,
        quantity: 1,
        product: {
          id: 4,
          name: "장바구니에서제거",
          price: 100000,
          imageUrl: "15",
          category: "패션잡화",
          quantity: 1,
        },
      },
    ],
  };
});
const originalMockCartItems = [...mockCartItems];

vi.mock("@/apis/cartItems/getCartItems", () => ({
  getCartItems: vi
    .fn()
    .mockImplementation(() => Promise.resolve([...mockCartItems])),
}));

vi.mock("@/apis/cartItems/addCartItems", () => ({
  addCartItems: vi.fn().mockImplementation(({ productId, quantity = 1 }) => {
    const product = mockProductItems.find(
      (product) => product.id === productId
    )!;

    const newCartItem = {
      id: mockCartItems.length + 1,
      quantity: quantity,
      product: product,
    };

    mockCartItems.push(newCartItem);

    return Promise.resolve();
  }),
}));

vi.mock("@/apis/cartItems/updateCartItemQuantity", () => ({
  updateCartItemQuantity: vi
    .fn()
    .mockImplementation(({ id: cartItemId, quantity }) => {
      const cartItemIndex = mockCartItems.findIndex(
        ({ id }) => id === Number(cartItemId)
      );

      mockCartItems[cartItemIndex].quantity = quantity;
      return Promise.resolve();
    }),
}));

vi.mock("@/apis/cartItems/removeCartItem", () => ({
  removeCartItem: vi.fn().mockImplementation(({ id: cartItemId }) => {
    const cartItemIndex = mockCartItems.findIndex(
      ({ id }) => id === Number(cartItemId)
    );

    mockCartItems.splice(cartItemIndex, 1);
    return Promise.resolve();
  }),
}));

describe("ProductList 테스트", () => {
  beforeEach(() => {
    mockCartItems = [...originalMockCartItems];
  });

  it("상품이 품절인 경우 담기 버튼을 렌더링하지 않고 이미지에 품절 텍스트가 렌더링된다.", async () => {
    await act(async () => {
      render(
        <ProductList
          resource={new Promise((resolve) => resolve(mockProductItems))}
        />
      );
    });

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    const listItems = within(list).getAllByRole("listitem");
    expect(within(listItems[0]).getByText("품절")).toBeInTheDocument();
    expect(within(listItems[0]).queryByText("담기")).not.toBeInTheDocument();
  });

  it("등록된 상품이 없을 때 상품 목록 리스트가 렌더링되지 않고 대체 텍스트가 렌더링된다.", async () => {
    await act(async () => {
      render(<ProductList resource={new Promise((resolve) => resolve([]))} />);
    });

    const list = screen.queryByRole("list");
    expect(list).not.toBeInTheDocument();

    expect(screen.getByText("등록된 상품이 없습니다.")).toBeInTheDocument();
  });

  it("담기 버튼을 클릭하면 장바구니에 담겨 현재 담은 수량(1)과 장바구니에서 제거, 수량 1개 추가 버튼이 렌더링된다.", async () => {
    await act(async () => {
      render(
        <CartItemProvider>
          <ProductList
            resource={new Promise((resolve) => resolve(mockProductItems))}
          />
        </CartItemProvider>
      );
    });

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    const listItems = within(list).getAllByRole("listitem");
    const addButton = within(listItems[4]).getByText("담기");
    fireEvent.click(addButton);

    await waitFor(() => {
      const listItem = within(listItems[4]);
      expect(
        listItem.getByTestId("current-cart-item-quantity")
      ).toHaveTextContent("1");
      expect(
        listItem.getByRole("button", { name: "장바구니에서 제거" })
      ).toBeInTheDocument();
      expect(
        listItem.getByRole("button", { name: "수량 1개 추가" })
      ).toBeInTheDocument();
    });
  });

  it("현재 담은 수량(2)에서 수량 1개 추가 버튼을 클릭하면 현재 담은 수량이 3으로 증가한다.", async () => {
    await act(async () => {
      render(
        <CartItemProvider>
          <ProductList
            resource={new Promise((resolve) => resolve(mockProductItems))}
          />
        </CartItemProvider>
      );
    });

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    const listItems = within(list).getAllByRole("listitem");
    const listItem = within(listItems[1]);
    const increaseQuantityButton = listItem.getByRole("button", {
      name: "수량 1개 추가",
    });
    fireEvent.click(increaseQuantityButton);

    await waitFor(() => {
      expect(
        listItem.getByTestId("current-cart-item-quantity")
      ).toHaveTextContent("3");
    });
  });

  it("현재 담은 수량(2)에서 수량 1개 빼기 버튼을 클릭하면 현재 담은 수량이 1으로 감소한다.", async () => {
    await act(async () => {
      render(
        <CartItemProvider>
          <ProductList
            resource={new Promise((resolve) => resolve(mockProductItems))}
          />
        </CartItemProvider>
      );
    });

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    const listItems = within(list).getAllByRole("listitem");
    const listItem = within(listItems[2]);
    const decreaseQuantityButton = listItem.getByRole("button", {
      name: "수량 1개 빼기",
    });
    fireEvent.click(decreaseQuantityButton);

    await waitFor(() => {
      expect(
        listItem.getByTestId("current-cart-item-quantity")
      ).toHaveTextContent("1");
    });
  });

  it("현재 담은 수량이 1개인 경우 장바구니에서 제거 버튼을 렌더링하고 클릭하면 장바구니에서 제거되어 담기 버튼이 렌더링된다.", async () => {
    await act(async () => {
      render(
        <CartItemProvider>
          <ProductList
            resource={new Promise((resolve) => resolve(mockProductItems))}
          />
        </CartItemProvider>
      );
    });

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    const listItems = within(list).getAllByRole("listitem");
    const listItem = within(listItems[3]);
    const removeButton = listItem.getByRole("button", {
      name: "장바구니에서 제거",
    });
    fireEvent.click(removeButton);

    await waitFor(() => {
      screen.debug();
      expect(within(listItems[3]).getByText("담기")).toBeInTheDocument();
    });
  });
});
