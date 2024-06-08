import styles from './PriceTable.module.css';
import Divider from '../common/Divider/Divider';
import ContentRow from '../common/ContentRow/ContentRow';
import { ReactNode } from 'react';

type PriceTableProps = {
  name: string;
  price: number | string;
  upperDivider?: boolean;
};

const PriceTableRow = ({ name, price, upperDivider }: PriceTableProps) => {
  const formatContent = () => {
    if (typeof price === 'string') return price;
    else return `${price.toLocaleString('ko-kr')}원`;
  };
  return (
    <>
      {upperDivider && <Divider />}
      <ContentRow title={name} content={formatContent()} />
    </>
  );
};

const PriceTableMain = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.container}>
      <Divider />
      <div className={styles.rows}>{children}</div>
    </div>
  );
};

export const PriceTable = Object.assign(PriceTableMain, {
  Row: PriceTableRow,
});
