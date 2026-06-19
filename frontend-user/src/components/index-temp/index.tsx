'use client';

import { formatPercent } from '@/lib/utils';
import styles from './index.module.scss';

interface IndexItem {
  id: string;
  name: string;
  code: string;
  current: number;
  change: number;
  temperature: number;
}

interface IndexTempProps {
  data: IndexItem[];
}

export default function IndexTemp({ data }: IndexTempProps) {
  const getTemperatureColor = (temp: number) => {
    if (temp >= 70) return styles.hot;
    if (temp >= 50) return styles.warm;
    if (temp >= 30) return styles.cool;
    return styles.cold;
  };

  const getTemperatureText = (temp: number) => {
    if (temp >= 70) return '偏高';
    if (temp >= 50) return '适中';
    if (temp >= 30) return '偏低';
    return '低估';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>指数温度</h3>
        <span className={styles.subtitle}>市场估值参考</span>
      </div>

      <div className={styles.indexList}>
        {data.map((item) => (
          <div key={item.id} className={styles.indexItem}>
            <div className={styles.indexInfo}>
              <span className={styles.indexName}>{item.name}</span>
              <span className={styles.indexCode}>{item.code}</span>
            </div>

            <div className={styles.indexData}>
              <span className={styles.current}>{item.current.toFixed(2)}</span>
              <span className={`${styles.change} ${item.change >= 0 ? styles.rise : styles.fall}`}>
                {formatPercent(item.change)}
              </span>
            </div>

            <div className={`${styles.temperature} ${getTemperatureColor(item.temperature)}`}>
              <div className={styles.tempValue}>{item.temperature}°</div>
              <div className={styles.tempBar}>
                <div 
                  className={styles.tempProgress} 
                  style={{ width: `${item.temperature}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
