import { HttpResponse } from 'msw';

export const getResponse404 = (text?: string) => {
  return new HttpResponse(null, {
    status: 404,
    statusText: text || '',
  });
};
