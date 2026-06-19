'use client';

import { useState } from 'react';
import { formatMoney, formatPercent } from '@/lib/utils';
import styles from './index.module.scss';

interface AssetData {
  totalAsset: number;
  yesterdayProfit: number;
  totalProfit: number;
  profitRate: number;
}

interface AssetCardProps {
  data: AssetData;
}

export default function AssetCard({ data }: AssetCardProps) {
  const [isHidden, setIsHidden] = useState(false);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  const displayValue = (value: number, formatter: (v: number) => string) => {
    return isHidden ? '****' : formatter(value);
  };

  return (
    <div className={styles.assetCard}>
      <div className={styles.header}>
        <span className={styles.label}>我的资产(元)</span>
        <button className={styles.eyeBtn} onClick={toggleVisibility} aria-label={isHidden ? '显示' : '隐藏'}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            {isHidden ? (
              <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
            ) : (
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            )}
          </svg>
        </button>
      </div>

      <div className={styles.totalAsset}>
        {displayValue(data.totalAsset, (v) => formatMoney(v, 2))}
      </div>

      <div className={styles.profitRow}>
        <div className={styles.profitItem}>
          <span className={styles.profitLabel}>昨日收益</span>
          <span className={`${styles.profitValue} ${data.yesterdayProfit >= 0 ? styles.rise : styles.fall}`}>
            {displayValue(data.yesterdayProfit, (v) => (v >= 0 ? '+' : '') + formatMoney(v, 2))}
          </span>
        </div>
        <div className={styles.divider} />
        <div className={styles.profitItem}>
          <span className={styles.profitLabel}>累计收益</span>
          <span className={`${styles.profitValue} ${data.totalProfit >= 0 ? styles.rise : styles.fall}`}>
            {displayValue(data.totalProfit, (v) => (v >= 0 ? '+' : '') + formatMoney(v, 2))}
          </span>
        </div>
        <div className={styles.divider} />
        <div className={styles.profitItem}>
          <span className={styles.profitLabel}>收益率</span>
          <span className={`${styles.profitValue} ${data.profitRate >= 0 ? styles.rise : styles.fall}`}>
            {displayValue(data.profitRate, (v) => formatPercent(v))}
          </span>
        </div>
      </div>
    </div>
  );
}
