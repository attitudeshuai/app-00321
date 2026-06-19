'use client';

import styles from './index.module.scss';

export type SortField = 'default' | 'dayChange' | 'yearChange' | 'nav';
export type SortOrder = 'asc' | 'desc';

interface FundSortProps {
  field: SortField;
  order: SortOrder;
  onChange: (field: SortField, order: SortOrder) => void;
}

interface SortOption {
  id: SortField;
  label: string;
}

const sortOptions: SortOption[] = [
  { id: 'dayChange', label: '日涨跌' },
  { id: 'yearChange', label: '近一年' },
  { id: 'nav', label: '单位净值' },
];

export default function FundSort({ field, order, onChange }: FundSortProps) {
  const handleClick = (clickedField: SortField) => {
    if (field !== clickedField) {
      onChange(clickedField, 'desc');
    } else {
      onChange(clickedField, order === 'desc' ? 'asc' : 'desc');
    }
  };

  return (
    <div className={styles.sortWrapper}>
      {sortOptions.map((opt) => {
        const isActive = field === opt.id;
        return (
          <button
            key={opt.id}
            className={`${styles.sortBtn} ${isActive ? styles.active : ''}`}
            onClick={() => handleClick(opt.id)}
            type="button"
          >
            <span>{opt.label}</span>
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="currentColor"
              className={`${styles.sortIcon} ${isActive ? (order === 'asc' ? styles.asc : styles.desc) : ''}`}
            >
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
