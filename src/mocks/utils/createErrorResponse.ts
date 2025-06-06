import { HttpResponse } from 'msw';

export const createErrorResponse = (errorCode: string, message: string, status: number) => {
  return new HttpResponse(JSON.stringify({ errorCode, message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
};
