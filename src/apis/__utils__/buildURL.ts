import { SmartURLSearchParams } from "@utils/SmartURLSearchParams";

interface URLInit {
  baseUrl: URL;
  path?: string;
  params?: SmartURLSearchParams;
}

export const buildURL = ({ baseUrl, path, params }: URLInit): URL => {
  const url = new URL(baseUrl);

  url.pathname = path ? path : "";
  url.search = params ? params.toString() : "";

  return url;
};
