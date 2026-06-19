'use client';

import { useState, useMemo } from 'react';
import NavBar from '@/components/nav-bar';
import FundCard, { FundItem } from '@/components/fund-card';
import FundSearch from '@/components/fund-search';
import FundFilter from '@/components/fund-filter';
import FundSort, { SortField, SortOrder } from '@/components/fund-sort';
import { fundCategories, fundListData, scaleRanges } from '@/lib/mock-data';
import styles from './page.module.scss';

interface FilterState {
  riskLevel: string;
  company: string;
  scale: string;
}

export default function FundListPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    riskLevel: 'all',
    company: 'all',
    scale: 'all',
  });
  const [sortField, setSortField] = useState<SortField>('default');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSortChange = (field: SortField, order: SortOrder) => {
    setSortField(field);
    setSortOrder(order);
  };

  const filteredFunds = useMemo(() => {
    let result = [...fundListData] as FundItem[];

    if (activeCategory !== 'all') {
      result = result.filter((fund) => fund.type === activeCategory);
    }

    if (searchKeyword.trim()) {
      const keyword = searchKeyword.trim().toLowerCase();
      result = result.filter(
        (fund) =>
          fund.name.toLowerCase().includes(keyword) ||
          fund.code.toLowerCase().includes(keyword)
      );
    }

    if (filters.riskLevel !== 'all') {
      result = result.filter((fund) => fund.riskLevel === filters.riskLevel);
    }

    if (filters.company !== 'all') {
      result = result.filter((fund) => fund.company === filters.company);
    }

    if (filters.scale !== 'all') {
      const range = scaleRanges.find((r) => r.id === filters.scale);
      if (range) {
        result = result.filter((fund) => fund.scale >= range.min && fund.scale < range.max);
      }
    }

    if (sortField !== 'default') {
      result.sort((a, b) => {
        let comparison = 0;
        if (sortField === 'dayChange') {
          comparison = b.dayChange - a.dayChange;
        } else if (sortField === 'yearChange') {
          comparison = b.yearChange - a.yearChange;
        } else if (sortField === 'nav') {
          comparison = b.nav - a.nav;
        }
        return sortOrder === 'desc' ? comparison : -comparison;
      });
    }

    return result;
  }, [activeCategory, searchKeyword, filters, sortField, sortOrder]);

  const hasActiveFilters = filters.riskLevel !== 'all' || filters.company !== 'all' || filters.scale !== 'all';

  const resetAllFilters = () => {
    setSearchKeyword('');
    setFilters({ riskLevel: 'all', company: 'all', scale: 'all' });
  };

  return (
    <div className={styles.page}>
      <NavBar title="基金列表" />

      <div className={styles.stickyHeader}>
        <FundSearch value={searchKeyword} onChange={setSearchKeyword} />

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
      </div>

      <div className={styles.listHeader}>
        <span className={styles.fundCount}>共 {filteredFunds.length} 只基金</span>
        <div className={styles.headerActions}>
          <FundFilter filters={filters} onChange={handleFilterChange} />
          <FundSort field={sortField} order={sortOrder} onChange={handleSortChange} />
        </div>
      </div>

      {hasActiveFilters && (
        <div className={styles.activeFiltersBar}>
          <span className={styles.activeFiltersLabel}>已选筛选：</span>
          <div className={styles.activeTags}>
            {filters.riskLevel !== 'all' && (
              <button className={styles.activeTag} onClick={() => handleFilterChange('riskLevel', 'all')}>
                风险：{filters.riskLevel.toUpperCase()}
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            )}
            {filters.company !== 'all' && (
              <button className={styles.activeTag} onClick={() => handleFilterChange('company', 'all')}>
                公司
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            )}
            {filters.scale !== 'all' && (
              <button className={styles.activeTag} onClick={() => handleFilterChange('scale', 'all')}>
                规模
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            )}
            <button className={styles.resetBtn} onClick={resetAllFilters}>重置</button>
          </div>
        </div>
      )}

      <div className={styles.fundList}>
        {filteredFunds.length > 0 ? (
          filteredFunds.map((fund) => <FundCard key={fund.id} data={fund} />)
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <div className={styles.emptyText}>暂无匹配的基金</div>
            <button className={styles.emptyResetBtn} onClick={resetAllFilters}>
              清除筛选条件
            </button>
          </div>
        )}
      </div>

      <div className={styles.safeAreaBottom} />
    </div>
  );
}
