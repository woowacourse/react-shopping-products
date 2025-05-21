export const isErrorResponse = (
  response: unknown
): response is { error: string } => {
  return (
    response !== null &&
    response !== undefined &&
    typeof response === "object" &&
    "error" in response
  );
};
