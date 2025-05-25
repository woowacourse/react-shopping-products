import { screen, waitFor } from "@testing-library/react";

import { server } from "../../mocks/server";

import ProductList from "./ProductList";
import { renderWithProviders } from "../../__test__/test-utils";

server.listen();

test("상품 목록이 정상적으로 렌더링된다", async () => {
  renderWithProviders(<ProductList category="전체" sort="id,asc" />);

  await waitFor(() => {
    screen.getByText("에어포스");
    screen.getByText("후드티");
    screen.getByText("바나나");
  });
});
