'use client';

import { useState, useMemo } from 'react';
import NavBar from '@/components/nav-bar';
import FundCard from '@/components/fund-card';
import {
  fundCategories,
  fundListData,
  riskLevels,
  fundCompanies,
  scaleRanges,
  sortOptions,
} from '@/lib/mock-data';
import styles from './page.module.scss';

interface FundItem {
  id: string;
  code: string;
  name: string;
  type: string;
  riskLevel: string;
  company: string;
  companyName: string;
  scale: number;
  nav: number;
  dayChange: number;
  yearChange: number;
}

type SortType =
  | 'default'
  | 'dayChangeDesc'
  | 'dayChangeAsc'
  | 'yearChangeDesc'
  | 'yearChangeAsc'
  | 'navDesc'
  | 'navAsc';

type SortField = 'dayChange' | 'yearChange' | 'nav';

interface FilterState {
  category: string;
  riskLevel: string;
  company: string;
  scaleRange: string;
  searchKeyword: string;
}

function parseSortType(sortType: SortType): { field: SortField | null; isAsc: boolean } {
  if (sortType === 'default') return { field: null, isAsc: false };
  const isAsc = sortType.endsWith('Asc');
  if (sortType.startsWith('dayChange')) return { field: 'dayChange', isAsc };
  if (sortType.startsWith('yearChange')) return { field: 'yearChange', isAsc };
  return { field: 'nav', isAsc };
}

export default function FundListPage() {
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    riskLevel: 'all',
    company: 'all',
    scaleRange: 'all',
    searchKeyword: '',
  });

  const [sortType, setSortType] = useState<SortType>('default');
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const { field: activeSortField, isAsc } = useMemo(
    () => parseSortType(sortType),
    [sortType]
  );

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetPanelFilters = () => {
    setFilters((prev) => ({
      ...prev,
      riskLevel: 'all',
      company: 'all',
      scaleRange: 'all',
    }));
  };

  const resetAllFilters = () => {
    setFilters({
      category: 'all',
      riskLevel: 'all',
      company: 'all',
      scaleRange: 'all',
      searchKeyword: '',
    });
    setSortType('default');
  };

  const clearSort = () => {
    setSortType('default');
  };

  const handleSortClick = (field: SortField) => {
    const descType: SortType = field === 'dayChange' ? 'dayChangeDesc' : field === 'yearChange' ? 'yearChangeDesc' : 'navDesc';
    const ascType: SortType = field === 'dayChange' ? 'dayChangeAsc' : field === 'yearChange' ? 'yearChangeAsc' : 'navAsc';

    if (activeSortField !== field) {
      setSortType(descType);
      return;
    }

    if (!isAsc) {
      setSortType(ascType);
    } else {
      setSortType('default');
    }
  };

  const getSortIconRotation = (field: SortField) => {
    if (activeSortField !== field) return 'rotate(0deg)';
    return isAsc ? 'rotate(180deg)' : 'rotate(0deg)';
  };

  const isSortActive = (field: SortField) => {
    return activeSortField === field;
  };

  const filteredFunds = useMemo(() => {
    let result = [...fundListData] as FundItem[];

    if (filters.searchKeyword.trim()) {
      const keyword = filters.searchKeyword.trim().toLowerCase();
      result = result.filter(
        (fund) =>
          fund.name.toLowerCase().includes(keyword) ||
          fund.code.toLowerCase().includes(keyword)
      );
    }

    if (filters.category !== 'all') {
      result = result.filter((fund) => fund.type === filters.category);
    }

    if (filters.riskLevel !== 'all') {
      result = result.filter((fund) => fund.riskLevel === filters.riskLevel);
    }

    if (filters.company !== 'all') {
      result = result.filter((fund) => fund.company === filters.company);
    }

    if (filters.scaleRange !== 'all') {
      const range = scaleRanges.find((r) => r.id === filters.scaleRange);
      if (range) {
        result = result.filter((fund) => fund.scale >= range.min && fund.scale < range.max);
      }
    }

    if (sortType !== 'default') {
      const sortConfig = sortOptions.find((s) => s.id === sortType);
      if (sortConfig && sortConfig.field) {
        result.sort((a, b) => {
          const field = sortConfig.field as keyof FundItem;
          const aVal = a[field] as number;
          const bVal = b[field] as number;
          return sortConfig.order === 'desc' ? bVal - aVal : aVal - bVal;
        });
      }
    }

    return result;
  }, [filters, sortType]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.riskLevel !== 'all') count++;
    if (filters.company !== 'all') count++;
    if (filters.scaleRange !== 'all') count++;
    return count;
  }, [filters]);

  return (
    <div className={styles.page}>
      <NavBar title="基金列表" />

      {/* 搜索框 */}
      <div className={styles.searchWrapper}>
        <div className={styles.searchBox}>
          <svg
            className={styles.searchIcon}
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="搜索基金名称或代码"
            value={filters.searchKeyword}
            onChange={(e) => updateFilter('searchKeyword', e.target.value)}
          />
          {filters.searchKeyword && (
            <button
              className={styles.clearBtn}
              onClick={() => updateFilter('searchKeyword', '')}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 分类标签 */}
      <div className={styles.categoryWrapper}>
        <div className={styles.categoryList}>
          {fundCategories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryItem} ${
                filters.category === category.id ? styles.active : ''
              }`}
              onClick={() => updateFilter('category', category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* 筛选工具栏 */}
      <div className={styles.filterBar}>
        <button
          className={`${styles.filterBtn} ${showFilterPanel ? styles.active : ''}`}
          onClick={() => setShowFilterPanel(!showFilterPanel)}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
          </svg>
          <span>筛选</span>
          {activeFilterCount > 0 && (
            <span className={styles.filterBadge}>{activeFilterCount}</span>
          )}
        </button>

        <div className={styles.sortTabs}>
          <button
            className={`${styles.sortTab} ${isSortActive('dayChange') ? styles.active : ''}`}
            onClick={() => handleSortClick('dayChange')}
          >
            <span>日涨跌</span>
            <svg
              viewBox="0 0 24 24"
              width="12"
              height="12"
              fill="currentColor"
              style={{
                transform: getSortIconRotation('dayChange'),
                transition: 'transform 0.2s',
              }}
            >
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </button>
          <button
            className={`${styles.sortTab} ${isSortActive('yearChange') ? styles.active : ''}`}
            onClick={() => handleSortClick('yearChange')}
          >
            <span>近一年</span>
            <svg
              viewBox="0 0 24 24"
              width="12"
              height="12"
              fill="currentColor"
              style={{
                transform: getSortIconRotation('yearChange'),
                transition: 'transform 0.2s',
              }}
            >
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </button>
          <button
            className={`${styles.sortTab} ${isSortActive('nav') ? styles.active : ''}`}
            onClick={() => handleSortClick('nav')}
          >
            <span>单位净值</span>
            <svg
              viewBox="0 0 24 24"
              width="12"
              height="12"
              fill="currentColor"
              style={{
                transform: getSortIconRotation('nav'),
                transition: 'transform 0.2s',
              }}
            >
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* 筛选面板 */}
      {showFilterPanel && (
        <div className={styles.filterPanel}>
          <div className={styles.filterSection}>
            <div className={styles.filterTitle}>风险等级</div>
            <div className={styles.filterOptions}>
              {riskLevels.map((item) => (
                <button
                  key={item.id}
                  className={`${styles.filterOption} ${
                    filters.riskLevel === item.id ? styles.active : ''
                  }`}
                  onClick={() => updateFilter('riskLevel', item.id)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <div className={styles.filterTitle}>基金公司</div>
            <div className={styles.filterOptions}>
              {fundCompanies.map((item) => (
                <button
                  key={item.id}
                  className={`${styles.filterOption} ${
                    filters.company === item.id ? styles.active : ''
                  }`}
                  onClick={() => updateFilter('company', item.id)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <div className={styles.filterTitle}>基金规模</div>
            <div className={styles.filterOptions}>
              {scaleRanges.map((item) => (
                <button
                  key={item.id}
                  className={`${styles.filterOption} ${
                    filters.scaleRange === item.id ? styles.active : ''
                  }`}
                  onClick={() => updateFilter('scaleRange', item.id)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterActions}>
            <button className={styles.resetBtn} onClick={resetPanelFilters}>
              重置筛选
            </button>
            <button
              className={styles.confirmBtn}
              onClick={() => setShowFilterPanel(false)}
            >
              确定
            </button>
          </div>
        </div>
      )}

      {/* 列表头部 */}
      <div className={styles.listHeader}>
        <span className={styles.fundCount}>共 {filteredFunds.length} 只基金</span>
        {sortType !== 'default' && (
          <button className={styles.sortClearBtn} onClick={clearSort}>
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
            <span>默认排序</span>
          </button>
        )}
      </div>

      {/* 基金列表 */}
      <div className={styles.fundList}>
        {filteredFunds.length > 0 ? (
          filteredFunds.map((fund) => <FundCard key={fund.id} data={fund} />)
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <div className={styles.emptyText}>未找到匹配的基金</div>
            <div className={styles.emptyActions}>
              {(filters.searchKeyword || filters.category !== 'all' || activeFilterCount > 0) && (
                <button className={styles.resetSearchBtn} onClick={resetAllFilters}>
                  清除所有条件
                </button>
              )}
              {sortType !== 'default' && (
                <button className={styles.resetSearchBtn} onClick={clearSort}>
                  恢复默认排序
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 底部安全区域 */}
      <div className={styles.safeAreaBottom} />
    </div>
  );
}
