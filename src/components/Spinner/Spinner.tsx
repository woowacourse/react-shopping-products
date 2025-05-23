import * as styles from './Spinner.styles';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

const Spinner = ({ size = 'medium' }: SpinnerProps) => {
  return (
    <div css={styles.containerStyle}>
      <div
        css={[
          styles.baseSpinnerStyle,
          size === 'small' && styles.smallStyle,
          size === 'medium' && styles.mediumStyle,
          size === 'large' && styles.largeStyle
        ]}
      />
    </div>
  );
};

export default Spinner;
