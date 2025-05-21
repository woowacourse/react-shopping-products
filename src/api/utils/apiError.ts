export default class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public errorText: string,
  ) {
    super(`API 요청 실패: ${status} ${errorText}`);
    this.name = 'ApiError';
  }
}
