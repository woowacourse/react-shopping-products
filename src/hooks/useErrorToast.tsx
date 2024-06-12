import { useErrorContext } from "../hooks";
import { Toast } from "../components";

export default function useErrorToast() {
  const { error, setError } = useErrorContext();

  const errorToastStyle = {
    bgColor: "#ffc9c9",
    textColor: "#0a0d13",
  };

  const handleCloseToast = () => {
    setError(null);
  };

  const renderErrorToast = () => {
    if (error) {
      return (
        <Toast
          style={errorToastStyle}
          message={error.message}
          onClose={handleCloseToast}
        />
      );
    }
    return null;
  };

  return {
    renderErrorToast,
  };
}
