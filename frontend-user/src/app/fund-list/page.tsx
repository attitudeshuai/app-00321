'use client';

import { useState, useMemo } from 'react';
import NavBar from '@/components/nav-bar';
import FundCard from '@/components/fund-card';
import { fundCategories, fundListData } from '@/lib/mock-data';
import styles from './page.module.scss';

type SortType = 'default' | 'dayChangeDesc' | 'dayChangeAsc' | 'yearChange';

export default function FundListPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortType, setSortType] = useState<SortType>('default');

  const filteredFunds = useMemo(() => {
    let result = activeCategory === 'all' 
      ? [...fundListData] 
      : fundListData.filter((fund) => fund.type === activeCategory);

    // 排序
    if (sortType === 'dayChangeDesc') {
      result.sort((a, b) => b.dayChange - a.dayChange);
    } else if (sortType === 'dayChangeAsc') {
      result.sort((a, b) => a.dayChange - b.dayChange);
    } else if (sortType === 'yearChange') {
      result.sort((a, b) => b.yearChange - a.yearChange);
    }

    return result;
  }, [activeCategory, sortType]);

  return (
    <div className={styles.page}>
      <NavBar title="基金列表" />

      {/* 分类标签 */}
      <div className={styles.categoryWrapper}>
        <div className={styles.categoryList}>
          {fundCategories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryItem} ${
                activeCategory === category.id ? styles.active : ''
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* 列表头部 */}
      <div className={styles.listHeader}>
        <span className={styles.fundCount}>共 {filteredFunds.length} 只基金</span>
        <div className={styles.sortOptions}>
          <button 
            className={`${styles.sortBtn} ${
              sortType === 'dayChangeDesc' || sortType === 'dayChangeAsc' ? styles.active : ''
            }`}
            onClick={() => {
              if (sortType === 'default') {
                setSortType('dayChangeDesc');
              } else if (sortType === 'dayChangeDesc') {
                setSortType('dayChangeAsc');
              } else {
                setSortType('default');
              }
            }}
          >
            <span>日涨跌</span>
            <svg 
              viewBox="0 0 24 24" 
              width="14" 
              height="14" 
              fill="currentColor"
              style={{
                transform: sortType === 'dayChangeAsc' ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s'
              }}
            >
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* 基金列表 */}
      <div className={styles.fundList}>
        {filteredFunds.length > 0 ? (
          filteredFunds.map((fund) => <FundCard key={fund.id} data={fund} />)
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📋</div>
            <div className={styles.emptyText}>暂无相关基金</div>
          </div>
        )}
      </div>

      {/* 底部安全区域 */}
      <div className={styles.safeAreaBottom} />
    </div>
  );
}
