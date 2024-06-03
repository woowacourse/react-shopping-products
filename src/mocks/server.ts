import { setupServer } from "msw/node";

import { cartItemListHandlers, productListHandlers } from "./handlers/index";

export const server = setupServer(
  ...cartItemListHandlers,
  ...productListHandlers
);
