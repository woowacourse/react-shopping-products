import { CART_API_URL, USERNAME, USER_PASSWORD } from "../../env/envVariables";
import ApiClient from "./ApiClient";
import { generateBasicToken } from "../__utils__/generateBasicToken";

export const cartClient = new ApiClient(CART_API_URL, {
  Authorization: generateBasicToken(USERNAME, USER_PASSWORD),
  "Content-Type": "application/json",
});
