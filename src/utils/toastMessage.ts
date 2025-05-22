const toastMessage = ({
  message,
  duration = 3000,
  updateMessage,
  resetMessage,
}: {
  message: string;
  duration?: number;
  updateMessage: (newMessage: string) => void;
  resetMessage: () => void;
}) => {
  updateMessage(message);

  if (message) {
    setTimeout(() => {
      resetMessage();
    }, duration);
  }
};

export default toastMessage;
