export const isErrorResponse = (
  response: unknown
): response is { error: string } => {
  return (
    typeof response === "object" &&
    response !== null &&
    "error" in response &&
    typeof response.error === "string"
  );
};
