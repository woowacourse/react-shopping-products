class ErrorWithHeader extends Error {
  header: string;

  constructor(header: string, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.header = header;
  }
}

export default ErrorWithHeader;
