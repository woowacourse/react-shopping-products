// src/mocks/browser.ts
import { setupWorker } from "msw/browser";
import { handlers } from "../domains/ShoppingProducts/apis/mocks/handlers";

export const worker = setupWorker(...handlers);
