import { setupServer } from "msw/node";
import { handlers } from "../domains/ShoppingProducts/apis/mocks/handlers";

export const server = setupServer(...handlers);
