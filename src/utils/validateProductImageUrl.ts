import { PRODUCT_IMAGE_PROTOCOLS } from "../constants";

export default function validateProductImageUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    const protocol = url.protocol.toLowerCase();

    return PRODUCT_IMAGE_PROTOCOLS.includes(protocol);
  } catch {
    return false;
  }
}
