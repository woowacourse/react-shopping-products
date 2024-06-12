export const handleResponse = async (response: Response, errorMessage: string) => {
  if (!response.ok) {
    throw new Error(errorMessage);
  }
  return response;
};
