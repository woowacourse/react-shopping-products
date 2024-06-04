const Toast = ({ message }: { message: string }) => {
  return (
    <div style={{ position: 'fixed', top: '0' }}>
      <span>{message}</span>
    </div>
  );
};

export default Toast;
