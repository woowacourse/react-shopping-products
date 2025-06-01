import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
  within,
} from "@testing-library/react";
import { FilterOption, SortOption } from "./ProductContent.type";
import { APIProvider } from "@/context/APIContext";
import App from "@/App";
import { ProductItemType } from "@/types/product";

let mockProductItems: ProductItemType[] = [];

beforeEach(() => {
  mockProductItems = [
    {
      id: 1,
      name: "메이토",
      price: 1000,
      imageUrl: "",
      category: "식료품",
      quantity: 1,
    },
    {
      id: 2,
      name: "토마토",
      price: 10000,
      imageUrl: "",
      category: "식료품",
      quantity: 1,
    },
    {
      id: 3,
      name: "우비",
      price: 100000,
      imageUrl: "",
      category: "패션잡화",
      quantity: 1,
    },
  ];
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
      render(
        <APIProvider>
          <App />
        </APIProvider>
      );
    });

    await waitFor(() => {
      expect(screen.queryByText("로딩 중입니다...")).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.queryByText("상품 목록을 가져오는 중입니다...")
      ).not.toBeInTheDocument();
    });

    const list = screen.getByRole("list");

    await waitFor(() => {
      expect(list).toBeInTheDocument();

      expect(list.querySelectorAll("li")).toHaveLength(initialItemCount);
    });

    const filterDropdown = screen.getByTestId("filter-dropdown");
    fireEvent.click(within(filterDropdown).getByTestId("dropdown-trigger"));
    fireEvent.click(
      within(filterDropdown).getByTestId(`dropdown-option-${category}`)
    );

    await waitFor(() => {
      expect(
        screen.queryByText("상품 목록을 가져오는 중 입니다...")
      ).not.toBeInTheDocument();
    });

    await waitFor(() => {
      const updatedList = screen.getByRole("list");
      const listItems = within(updatedList).getAllByRole("listitem");
      expect(listItems).toHaveLength(expectedItemCount);
      listItems.forEach((item) => {
        expect(item).toBeVisible();
      });
    });
  };

  it("전체 상품 목록 3개에서 식료품 카테고리를 선택하면 상품 목록은 2개가 렌더링된다.", async () => {
    await testCategoryFiltering("식료품", 3, 2);
  });

  it("전체 상품 목록 3개에서 패션잡화 카테고리를 선택하면 상품 목록은 1개가 렌더링된다.", async () => {
    await testCategoryFiltering("패션잡화", 3, 1);
  });

  it("등록된 상품이 없을 때 상품 목록 리스트가 렌더링되지 않고 대체 텍스트가 렌더링된다.", async () => {
    mockProductItems = [];
    await act(async () => {
      render(
        <APIProvider>
          <App />
        </APIProvider>
      );
    });

    await waitFor(() => {
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
      expect(screen.getByText("등록된 상품이 없습니다.")).toBeInTheDocument();
    });
  });
});

describe("ProductContent - Sorting Tests", () => {
  const testProductSorting = async (
    sortOption: SortOption,
    expectedOrder: string[]
  ) => {
    await act(async () => {
      render(
        <APIProvider>
          <App />
        </APIProvider>
      );
    });
    await waitFor(() => {
      expect(screen.queryByText("로딩 중입니다...")).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.queryByText("상품 목록을 가져오는 중입니다...")
      ).not.toBeInTheDocument();
    });
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    const sortDropdown = screen.getByTestId("sort-dropdown");
    fireEvent.click(within(sortDropdown).getByTestId("dropdown-trigger"));

    fireEvent.click(
      within(sortDropdown).getByTestId(`dropdown-option-${sortOption}`)
    );

    // 선택된 옵션 텍스트가 화면에 있는지 확인
    expect(screen.getByText(sortOption)).toBeInTheDocument();

    // 정렬 후 아이템 순서 확인
    await waitFor(() => {
      const listItems = within(list).getAllByRole("listitem");
      expectedOrder.forEach((productName, index) => {
        expect(
          within(listItems[index]).getByText(productName)
        ).toBeInTheDocument();
      });
    });
  };

  it("낮은 가격순 정렬 시 올바른 순서로 렌더링 된다", async () => {
    await testProductSorting("낮은 가격순", ["메이토", "토마토", "우비"]);
  });

  it("높은 가격순 정렬 시 올바른 순서로 렌더링 된다", async () => {
    await testProductSorting("높은 가격순", ["우비", "토마토", "메이토"]);
  });
});
