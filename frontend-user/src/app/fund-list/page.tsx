'use client';

import { useState, useMemo } from 'react';
import NavBar from '@/components/nav-bar';
import FundCard from '@/components/fund-card';
import { fundCategories, fundListData, riskLevels, scaleRanges, fundCompanies } from '@/lib/mock-data';
import styles from './page.module.scss';

type SortField = 'dayChange' | 'yearChange' | 'nav';
type SortOrder = 'desc' | 'asc';

interface FilterState {
  searchKeyword: string;
  riskLevel: string;
  company: string;
  scaleRange: string;
}

interface SortState {
  field: SortField;
  order: SortOrder | null;
}

export default function FundListPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    searchKeyword: '',
    riskLevel: 'all',
    company: 'all',
    scaleRange: 'all',
  });
  const [sort, setSort] = useState<SortState>({
    field: 'dayChange',
    order: null,
  });

  const hasActiveFilters = useMemo(() => {
    return (
      filters.searchKeyword.trim() !== '' ||
      filters.riskLevel !== 'all' ||
      filters.company !== 'all' ||
      filters.scaleRange !== 'all'
    );
  }, [filters]);

  const filteredFunds = useMemo(() => {
    let result = [...fundListData];

    if (activeCategory !== 'all') {
      result = result.filter((fund) => fund.type === activeCategory);
    }

    if (filters.searchKeyword.trim()) {
      const keyword = filters.searchKeyword.trim().toLowerCase();
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

    if (filters.scaleRange !== 'all') {
      const range = scaleRanges.find((r) => r.id === filters.scaleRange);
      if (range) {
        result = result.filter(
          (fund) => fund.scale !== undefined && fund.scale >= range.min && fund.scale < range.max
        );
      }
    }

    if (sort.order) {
      result.sort((a, b) => {
        const aVal = a[sort.field];
        const bVal = b[sort.field];
        return sort.order === 'desc' ? bVal - aVal : aVal - bVal;
      });
    }

    return result;
  }, [activeCategory, filters, sort]);

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, searchKeyword: value }));
  };

  const handleClearSearch = () => {
    setFilters((prev) => ({ ...prev, searchKeyword: '' }));
  };

  const handleSortClick = (field: SortField) => {
    setSort((prev) => {
      if (prev.field !== field) {
        return { field, order: 'desc' };
      }
      if (prev.order === 'desc') {
        return { field, order: 'asc' };
      }
      if (prev.order === 'asc') {
        return { field, order: null };
      }
      return { field, order: 'desc' };
    });
  };

  const openFilterPanel = () => {
    setShowFilterPanel(true);
  };

  const closeFilterPanel = () => {
    setShowFilterPanel(false);
  };

  const handleFilterChange = (key: keyof Omit<FilterState, 'searchKeyword'>, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      searchKeyword: filters.searchKeyword,
      riskLevel: 'all',
      company: 'all',
      scaleRange: 'all',
    });
  };

  const getSortLabel = (field: SortField) => {
    const labels: Record<SortField, string> = {
      dayChange: '日涨跌',
      yearChange: '近一年',
      nav: '单位净值',
    };
    return labels[field];
  };

  const getSortIcon = (field: SortField) => {
    if (sort.field !== field || !sort.order) {
      return (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" opacity={0.4}>
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      );
    }
    return (
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="currentColor"
        style={{
          transform: sort.order === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
        }}
      >
        <path d="M7 10l5 5 5-5H7z" />
      </svg>
    );
  };

  return (
    <div className={styles.page}>
      <NavBar title="基金列表" />

      <div className={styles.searchWrapper}>
        <div className={styles.searchBox}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="搜索基金名称/代码"
            value={filters.searchKeyword}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {filters.searchKeyword && (
            <button className={styles.clearBtn} onClick={handleClearSearch}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
              </svg>
            </button>
          )}
        </div>
        <button
          className={`${styles.filterBtn} ${hasActiveFilters ? styles.active : ''}`}
          onClick={openFilterPanel}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
          </svg>
          {hasActiveFilters && <span className={styles.filterBadge} />}
        </button>
      </div>

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

      <div className={styles.listHeader}>
        <span className={styles.fundCount}>共 {filteredFunds.length} 只基金</span>
        <div className={styles.sortOptions}>
          {(['dayChange', 'yearChange', 'nav'] as SortField[]).map((field) => (
            <button
              key={field}
              className={`${styles.sortBtn} ${
                sort.field === field && sort.order ? styles.active : ''
              }`}
              onClick={() => handleSortClick(field)}
            >
              <span>{getSortLabel(field)}</span>
              {getSortIcon(field)}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.fundList}>
        {filteredFunds.length > 0 ? (
          filteredFunds.map((fund) => (
            <FundCard
              key={fund.id}
              data={{
                id: fund.id,
                code: fund.code,
                name: fund.name,
                nav: fund.nav,
                dayChange: fund.dayChange,
                yearChange: fund.yearChange,
              }}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <div className={styles.emptyText}>暂无符合条件的基金</div>
          </div>
        )}
      </div>

      <div className={styles.safeAreaBottom} />

      {showFilterPanel && (
        <>
          <div className={styles.filterMask} onClick={closeFilterPanel} />
          <div className={styles.filterPanel}>
            <div className={styles.filterHeader}>
              <h3 className={styles.filterTitle}>筛选条件</h3>
              <button className={styles.closeBtn} onClick={closeFilterPanel}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>

            <div className={styles.filterContent}>
              <div className={styles.filterSection}>
                <div className={styles.filterLabel}>风险等级</div>
                <div className={styles.filterOptions}>
                  {riskLevels.map((level) => (
                    <button
                      key={level.id}
                      className={`${styles.filterOption} ${
                        filters.riskLevel === level.id ? styles.selected : ''
                      }`}
                      onClick={() => handleFilterChange('riskLevel', level.id)}
                    >
                      {level.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filterSection}>
                <div className={styles.filterLabel}>基金公司</div>
                <div className={styles.filterOptions}>
                  {fundCompanies.map((company) => (
                    <button
                      key={company.id}
                      className={`${styles.filterOption} ${
                        filters.company === company.id ? styles.selected : ''
                      }`}
                      onClick={() => handleFilterChange('company', company.id)}
                    >
                      {company.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filterSection}>
                <div className={styles.filterLabel}>基金规模</div>
                <div className={styles.filterOptions}>
                  {scaleRanges.map((range) => (
                    <button
                      key={range.id}
                      className={`${styles.filterOption} ${
                        filters.scaleRange === range.id ? styles.selected : ''
                      }`}
                      onClick={() => handleFilterChange('scaleRange', range.id)}
                    >
                      {range.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.filterFooter}>
              <button className={styles.resetBtn} onClick={resetFilters}>
                重置筛选
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
