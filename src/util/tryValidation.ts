const tryValidation = (fn: () => void, handleErrorMessage: (errorMessage: string) => void) => {
  try {
    fn();
    return true;
  } catch (error) {
    if (error instanceof Error) {
      handleErrorMessage(error.message);
    }
    setTimeout(() => {
      handleErrorMessage('');
    }, 3000);
    return false;
  }
};

export default tryValidation;
