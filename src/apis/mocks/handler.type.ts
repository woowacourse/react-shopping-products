import { DefaultBodyType, PathParams } from "msw";

type JsonBodyType =
  | Record<string, any>
  | string
  | number
  | boolean
  | null
  | undefined;

interface StrictRequest<BodyType extends JsonBodyType> extends Request {
  json(): Promise<BodyType>;
}

export interface ApiRequestHandler {
  request: StrictRequest<DefaultBodyType>;
  params: PathParams;
}
