'use client';

import Link from 'next/link';
import { formatPercent } from '@/lib/utils';
import styles from './index.module.scss';

interface FundItem {
  id: string;
  code: string;
  name: string;
  type: string;
  nav: number;
  dayChange: number;
  yearChange: number;
}

interface FundCardProps {
  data: FundItem;
}

export default function FundCard({ data }: FundCardProps) {
  return (
    <Link href={`/fund-detail/${data.id}`} className={styles.fundCard}>
      <div className={styles.mainInfo}>
        <div className={styles.nameRow}>
          <span className={styles.name}>{data.name}</span>
          <span className={styles.code}>{data.code}</span>
        </div>
        <div className={styles.navRow}>
          <span className={styles.navLabel}>单位净值</span>
          <span className={styles.navValue}>{data.nav.toFixed(4)}</span>
        </div>
      </div>
      
      <div className={styles.changeInfo}>
        <div className={`${styles.dayChange} ${data.dayChange >= 0 ? styles.rise : styles.fall}`}>
          <span className={styles.changeLabel}>日涨跌</span>
          <span className={styles.changeValue}>{formatPercent(data.dayChange)}</span>
        </div>
        <div className={`${styles.yearChange} ${data.yearChange >= 0 ? styles.rise : styles.fall}`}>
          <span className={styles.changeLabel}>近一年</span>
          <span className={styles.changeValue}>{formatPercent(data.yearChange)}</span>
        </div>
      </div>
      
      <div className={styles.arrow}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
        </svg>
      </div>
    </Link>
  );
}
