import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner() {
  return (
    <div className={styles.loading_spinner__overlay}>
      <div className={styles.lds_dual_ring}></div>
    </div>
  );
}
