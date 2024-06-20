import Text from '../common/Text/Text';
import styles from './Toast.module.css';

type ToastProps = {
  message: string;
  header: string | undefined;
};

const Toast = ({ message, header }: ToastProps) => {
  return (
    <div className={`${styles.toast}`}>
      {header && (
        <Text size="m" weight="l">
          {header}
        </Text>
      )}
      <div style={{ marginTop: '10px' }} />
      <Text size="s" weight="m">
        {message}
      </Text>
    </div>
  );
};

export default Toast;
