import { screen, waitFor } from "@testing-library/react";

import { server } from "../../mocks/server";

import CartModal from "./CartModal";

import { renderWithProviders } from "../../__test__/test-utils";

server.listen();

test("장바구니에 담긴 상품이 렌더링된다", async () => {
  renderWithProviders(<CartModal isOpen={true} handleClose={() => {}} />);

  await waitFor(() => {
    screen.getByText("에어포스");
  });
});
