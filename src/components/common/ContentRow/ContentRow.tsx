import styles from './ContentRow.module.css';

import Text from '../Text/Text';

interface ContentRowProps {
  title: string;
  content: string;
}

const ContentRow = ({ title, content }: ContentRowProps) => {
  return (
    <div className={styles.container}>
      <Text size="m" weight="l">
        {title}
      </Text>
      <Text size="l" weight="l">
        {content}
      </Text>
    </div>
  );
};

export default ContentRow;
