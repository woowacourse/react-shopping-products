import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
  within,
} from "@testing-library/react";
import ProductContent from ".";
import { FilterOption, SortOption } from "./ProductContent.type";

let { mockProductItems } = vi.hoisted(() => {
  return {
    mockProductItems: [
      {
        id: 1,
        name: "메이토",
        price: 1000,
        imageUrl: "",
        category: "식료품",
      },
      {
        id: 2,
        name: "토마토",
        price: 10000,
        imageUrl: "",
        category: "식료품",
      },
      {
        id: 3,
        name: "우비",
        price: 100000,
        imageUrl: "",
        category: "패션잡화",
      },
    ],
  };
});

vi.mock("@/apis/products/getProducts", () => ({
  getProducts: vi.fn().mockImplementation(({ filterOption, sortOption }) => {
    return new Promise((resolve) => {
      const filterItems = mockProductItems.filter((item) => {
        if (filterOption === "전체") {
          return true;
        }

        return item.category === filterOption;
      });
      const resultItems = filterItems.sort((a, b) => {
        if (sortOption === "낮은 가격순") {
          return a.price - b.price;
        }

        return b.price - a.price;
      });
      resolve(resultItems);
    });
  }),
}));

describe("ProductContent Component", () => {
  const testCategoryFiltering = async (
    category: FilterOption,
    initialItemCount: number,
    expectedItemCount: number
  ) => {
    await act(async () => {
      render(<ProductContent cartItems={[]} setCartItems={() => {}} />);
    });

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    expect(within(list).getAllByRole("listitem")).toHaveLength(
      initialItemCount
    );

    const filterDropdown = screen.getByTestId("filter-dropdown");
    fireEvent.click(within(filterDropdown).getByTestId("dropdown-trigger"));
    fireEvent.click(
      within(filterDropdown).getByTestId(`dropdown-option-${category}`)
    );

    await waitFor(() => {
      expect(within(list).getAllByRole("listitem")).toHaveLength(
        expectedItemCount
      );
    });
  };

  it("전체 상품 목록 3개에서 식료품 카테고리를 선택하면 상품 목록은 2개가 렌더링된다.", async () => {
    await testCategoryFiltering("식료품", 3, 2);
  });

  it("전체 상품 목록 3개에서 패션잡화 카테고리를 선택하면 상품 목록은 1개가 렌더링된다.", async () => {
    await testCategoryFiltering("패션잡화", 3, 1);
  });

  const testProductSorting = async (
    sortOption: SortOption,
    expectedOrder: string[]
  ) => {
    await act(async () => {
      render(<ProductContent cartItems={[]} setCartItems={() => {}} />);
    });

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    const filterDropdown = screen.getByTestId("sort-dropdown");
    fireEvent.click(within(filterDropdown).getByTestId("dropdown-trigger"));
    fireEvent.click(
      within(filterDropdown).getByTestId(`dropdown-option-${sortOption}`)
    );

    await waitFor(() => {
      const listItems = within(list).getAllByRole("listitem");

      expectedOrder.forEach((productName, index) => {
        expect(
          within(listItems[index]).getByText(productName)
        ).toBeInTheDocument();
      });
    });
  };

  it("정렬을 낮은 가격 순으로 하면 상품 목록은 메이토 > 토마토 > 우비 순서로 렌더링된다.", async () => {
    await testProductSorting("낮은 가격순", ["메이토", "토마토", "우비"]);
  });

  it("정렬을 높은 가격 순으로 하면 상품 목록은 우비 > 토마토 > 메이토 순서로 렌더링된다.", async () => {
    await testProductSorting("높은 가격순", ["우비", "토마토", "메이토"]);
  });

  it("등록된 상품이 없을 때 상품 목록 리스트가 렌더링되지 않고 대체 텍스트가 렌더링된다.", async () => {
    mockProductItems = [];
    await act(async () => {
      render(<ProductContent cartItems={[]} setCartItems={() => {}} />);
    });

    const list = screen.queryByRole("list");
    expect(list).not.toBeInTheDocument();

    expect(screen.getByText("등록된 상품이 없습니다.")).toBeInTheDocument();
  });

  it("상품 목록을 불러오는 중일 때 로딩 메시지가 표시된다.", async () => {
    render(<ProductContent cartItems={[]} setCartItems={() => {}} />);

    expect(
      screen.getByText("상품 목록을 가져오는 중 입니다...")
    ).toBeInTheDocument();
  });
});
