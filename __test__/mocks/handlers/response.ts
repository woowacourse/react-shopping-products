export const Success = (body?: BodyInit) =>
  new Response(body, {
    status: 200,
  });

export const NotFoundError = (body?: BodyInit) =>
  new Response(body, {
    status: 404,
  });

export const InternalServerError = (body?: BodyInit) =>
  new Response(body, {
    status: 500,
  });
