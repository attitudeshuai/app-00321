'use client';

import { useState, useMemo } from 'react';
import NavBar from '@/components/nav-bar';
import FundCard from '@/components/fund-card';
import {
  fundCategories,
  fundListData,
  riskLevels,
  fundCompanies,
  fundScaleRanges,
} from '@/lib/mock-data';
import styles from './page.module.scss';

type SortField = 'dayChange' | 'yearChange' | 'nav';
type SortOrder = 'desc' | 'asc';

interface SortOption {
  field: SortField;
  label: string;
}

const sortOptions: SortOption[] = [
  { field: 'dayChange', label: '日涨跌' },
  { field: 'yearChange', label: '近一年' },
  { field: 'nav', label: '单位净值' },
];

export default function FundListPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [keyword, setKeyword] = useState<string>('');
  const [activeRisk, setActiveRisk] = useState<string>('all');
  const [activeCompany, setActiveCompany] = useState<string>('all');
  const [activeScale, setActiveScale] = useState<string>('all');

  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const filteredFunds = useMemo(() => {
    // 函数式管道：每一步 filter 都返回新数组，最终 sort 前再做一次浅拷贝，
    // 全程不修改 fundListData 或中间引用，避免任何排序副作用。
    const kw = keyword.trim().toLowerCase();

    const filtered = fundListData.filter((fund) => {
      if (activeCategory !== 'all' && fund.type !== activeCategory) return false;
      if (kw && !fund.name.toLowerCase().includes(kw) && !fund.code.toLowerCase().includes(kw)) {
        return false;
      }
      if (activeRisk !== 'all' && fund.risk !== activeRisk) return false;
      if (activeCompany !== 'all' && fund.companyId !== activeCompany) return false;
      if (activeScale !== 'all') {
        const range = fundScaleRanges.find((r) => r.id === activeScale);
        // 区间语义：[min, max)，左闭右开，避免 50 亿同时落入两档
        if (range && !(fund.scale >= range.min && fund.scale < range.max)) return false;
      }
      return true;
    });

    if (!sortField) return filtered;

    // 通过展开运算符产生新数组再排序，确保不修改 filter 返回值（即使被外部引用也安全）
    return [...filtered].sort((a, b) => {
      const diff = a[sortField] - b[sortField];
      return sortOrder === 'desc' ? -diff : diff;
    });
  }, [activeCategory, keyword, activeRisk, activeCompany, activeScale, sortField, sortOrder]);

  const handleSortClick = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleResetFilters = () => {
    setActiveRisk('all');
    setActiveCompany('all');
    setActiveScale('all');
  };

  const hasActiveFilters =
    activeRisk !== 'all' || activeCompany !== 'all' || activeScale !== 'all';

  return (
    <div className={styles.page}>
      <NavBar title="基金列表" />

      {/* 顶部筛选区域 */}
      <div className={styles.filterWrapper}>
        {/* 搜索框 */}
        <div className={styles.searchBox}>
          <svg
            className={styles.searchIcon}
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="搜索基金名称或代码"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          {keyword && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => setKeyword('')}
              aria-label="清空"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          )}
        </div>

        {/* 分类标签 */}
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

        {/* 多维度筛选 */}
        <div className={styles.filterGroups}>
          <FilterRow
            label="风险"
            options={riskLevels}
            activeId={activeRisk}
            onChange={setActiveRisk}
          />
          <FilterRow
            label="公司"
            options={fundCompanies}
            activeId={activeCompany}
            onChange={setActiveCompany}
          />
          <FilterRow
            label="规模"
            options={fundScaleRanges}
            activeId={activeScale}
            onChange={setActiveScale}
          />
          {hasActiveFilters && (
            <button
              type="button"
              className={styles.resetBtn}
              onClick={handleResetFilters}
            >
              重置筛选
            </button>
          )}
        </div>
      </div>

      {/* 列表头部 */}
      <div className={styles.listHeader}>
        <span className={styles.fundCount}>共 {filteredFunds.length} 只基金</span>
        <div className={styles.sortOptions}>
          {sortOptions.map((option) => {
            const isActive = sortField === option.field;
            return (
              <button
                key={option.field}
                type="button"
                className={`${styles.sortBtn} ${isActive ? styles.active : ''}`}
                onClick={() => handleSortClick(option.field)}
              >
                <span>{option.label}</span>
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="currentColor"
                  style={{
                    transform:
                      isActive && sortOrder === 'asc'
                        ? 'rotate(180deg)'
                        : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                    opacity: isActive ? 1 : 0.5,
                  }}
                >
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </button>
            );
          })}
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

interface FilterOption {
  id: string;
  name: string;
}

interface FilterRowProps {
  label: string;
  options: FilterOption[];
  activeId: string;
  onChange: (id: string) => void;
}

function FilterRow({ label, options, activeId, onChange }: FilterRowProps) {
  return (
    <div className={styles.filterRow}>
      <span className={styles.filterLabel}>{label}</span>
      <div className={styles.filterOptions}>
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`${styles.filterChip} ${
              activeId === option.id ? styles.active : ''
            }`}
            onClick={() => onChange(option.id)}
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
}
