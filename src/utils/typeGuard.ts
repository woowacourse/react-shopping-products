export const isErrorResponse = (
  response: any
): response is { error: string } => {
  return response && typeof response === "object" && "error" in response;
};
