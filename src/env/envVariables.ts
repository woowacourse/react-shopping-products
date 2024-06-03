import { validateEnvVariables } from "@env/__utils__/validateEnvVariables";

export const CART_API_URL = import.meta.env.VITE_CART_API_URL;
export const USERNAME = import.meta.env.VITE_USERNAME;
export const USER_PASSWORD = import.meta.env.VITE_PASSWORD;

validateEnvVariables([
  { key: "CART_API_URL", value: CART_API_URL },
  { key: "USERNAME", value: USERNAME },
  { key: "USER_PASSWORD", value: USER_PASSWORD },
]);
