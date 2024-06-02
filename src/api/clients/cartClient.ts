import { CART_API_URL, USERNAME, USER_PASSWORD } from "../../envVariables";
import ApiClient from "./ApiClient";
import { generateBasicToken } from "../../utils/generateBasicToken";

export const cartClient = new ApiClient(CART_API_URL, {
  Authorization: generateBasicToken(USERNAME, USER_PASSWORD),
  "Content-Type": "application/json",
});
