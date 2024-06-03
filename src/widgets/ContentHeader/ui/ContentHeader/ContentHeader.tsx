import { Text } from '@/shared';

import css from './ContentHeader.module.css';

interface ContentHeaderProps {
  title: string;
  desc?: string;
}

export const ContentHeader = ({ title, desc }: ContentHeaderProps) => {
  return (
    <div className={css.contentHeaderContainer}>
      <Text type={'h1'} tag={'p'}>
        {title}
      </Text>
      {desc && (
        <Text type={'b1'} tag={'pre'} className={css.description}>
          {desc}
        </Text>
      )}
    </div>
  );
};
