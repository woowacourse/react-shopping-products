import { setupServer } from "msw/node";
import { handlers } from "../domains/ShoppingProducts/apis/mocks/apiHandlers";

export const server = setupServer(...handlers);
