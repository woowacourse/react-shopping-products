import objectToQueryString, { ObjectQueryParams } from '@/utils/objectToQueryString';
import { generateBasicToken } from '../utils/auth';
import { ERROR_MESSAGE } from '@/constants/messages';

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

type Body = ReadableStream | XMLHttpRequestBodyInit;
type HeadersType = [string, string][] | Record<string, string> | Headers;

const USER_ID = process.env.VITE_API_USER_ID || 'id';
const USER_PASSWORD = process.env.VITE_API_USER_PASSWORD || 'password';

type RequestProps = {
  baseUrl: string;
  endpoint: string;
  headers?: HeadersType;
  body?: Body | object | null;
  queryParams?: ObjectQueryParams;
  errorMessage: string;
};

type FetcherProps = RequestProps & {
  method: Method;
};

type Options = {
  method: Method;
  headers: HeadersType;
  body?: Body | null;
};

export const requestGet = async <T>({ headers = {}, ...args }: RequestProps): Promise<T> => {
  const response = await fetcher({
    ...args,
    method: 'GET',
    headers,
  });
  const data: T = await response.json();

  return data;
};

export const requestPatch = ({ headers = {}, ...args }: RequestProps) => {
  return fetcher({ method: 'PATCH', headers, ...args });
};

export const requestPost = ({ headers = {}, ...args }: RequestProps) => {
  return fetcher({ method: 'POST', headers, ...args });
};

export const requestDelete = ({ headers = {}, ...args }: RequestProps) => {
  return fetcher({ method: 'DELETE', headers, ...args });
};

const fetcher = ({
  method,
  baseUrl,
  endpoint,
  headers,
  body,
  queryParams,
  errorMessage,
}: FetcherProps) => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  };

  let url = `${baseUrl}${endpoint}`;

  if (queryParams) url += `?${objectToQueryString(queryParams)}`;

  return errorHandler(url, options, errorMessage);
};

const errorHandler = async (url: string, options: Options, errorMessage: string) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(errorMessage);

    return response;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof TypeError) return ERROR_MESSAGE.OFFLINE;
  if (error instanceof Error) return error.message;

  return ERROR_MESSAGE.UNKNOWN;
};
