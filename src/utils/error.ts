class ErrorBase<T extends string> extends Error {
  name: T;
  message: string;

  constructor({ name, message }: { name: T; message: string }) {
    super();
    this.name = name;
    this.message = message;
  }
}

type ErrorName =
  | 'AUTHORIZED_ERROR'
  | 'NOT_FOUND_ERROR'
  | 'BAD_REQUEST_ERROR'
  | 'SERVER_ERROR'
  | 'NETWORK_ERROR';

class CustomError extends ErrorBase<ErrorName> {}

export default CustomError;
