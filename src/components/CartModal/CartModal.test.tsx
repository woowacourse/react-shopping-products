import { screen, waitFor } from "@testing-library/react";

import CartModal from "./CartModal";

import { renderWithProviders } from "../../__test__/test-utils";

test("장바구니에 담긴 상품이 렌더링된다", async () => {
  renderWithProviders(<CartModal isOpen={true} handleClose={() => {}} />);

  await waitFor(() => {
    screen.getByText("에어포스");
  });
});
