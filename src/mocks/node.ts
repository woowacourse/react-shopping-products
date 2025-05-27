import { setupServer } from "msw/node";
import { handlers } from "./handler";

export const node = setupServer(...handlers);
