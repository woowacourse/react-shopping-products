export type ErrorStatus = 400 | 401 | 404 | 500 | 504;

export type ErrorName =
  | 'BAD_REQUEST_ERROR'
  | 'UNAUTHORIZED_ERROR'
  | 'NOT_FOUND_ERROR'
  | 'SERVER_ERROR'
  | 'NETWORK_ERROR';
