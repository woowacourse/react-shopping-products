const tryApiCall = async <T>(
  apiCall: () => Promise<T>,
  handleErrorToast: (errorMessage: string) => void,
) => {
  try {
    const data = await apiCall();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      handleErrorToast(error.message);
      setTimeout(() => {
        handleErrorToast('');
      }, 3000);
    }
    return undefined;
  }
};

export default tryApiCall;
