class APIError extends Error {
  public statusCode: number;
  public message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.message = message;

    Object.setPrototypeOf(this, APIError.prototype);
  }
}

export default APIError;
