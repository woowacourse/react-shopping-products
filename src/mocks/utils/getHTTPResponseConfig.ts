import { HttpResponse } from 'msw';

export const getHTTPResponseConfig = (status: number, text?: string) => {
  return new HttpResponse(null, {
    status: status,
    statusText: text || '',
  });
};
