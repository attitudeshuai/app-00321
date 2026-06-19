'use client';

import { useState } from 'react';
import { riskLevels, fundCompanies, scaleRanges } from '@/lib/mock-data';
import styles from './index.module.scss';

type FilterKey = 'riskLevel' | 'company' | 'scale';

interface FilterState {
  riskLevel: string;
  company: string;
  scale: string;
}

interface FundFilterProps {
  filters: FilterState;
  onChange: (key: FilterKey, value: string) => void;
}

interface FilterOption {
  id: string;
  name: string;
}

function FilterRow({ 
  label, 
  options, 
  selected, 
  onSelect 
}: { 
  label: string; 
  options: FilterOption[]; 
  selected: string; 
  onSelect: (value: string) => void;
}) {
  return (
    <div className={styles.filterRow}>
      <span className={styles.filterLabel}>{label}</span>
      <div className={styles.filterOptions}>
        {options.map((opt) => (
          <button
            key={opt.id}
            className={`${styles.filterOption} ${selected === opt.id ? styles.active : ''}`}
            onClick={() => onSelect(opt.id)}
            type="button"
          >
            {opt.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function FundFilter({ filters, onChange }: FundFilterProps) {
  const [expanded, setExpanded] = useState(false);

  const activeCount = [
    filters.riskLevel !== 'all',
    filters.company !== 'all',
    filters.scale !== 'all',
  ].filter(Boolean).length;

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.filterToggle} onClick={() => setExpanded(!expanded)}>
        <span className={styles.toggleLabel}>
          筛选
          {activeCount > 0 && <span className={styles.badge}>{activeCount}</span>}
        </span>
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="currentColor"
          className={`${styles.toggleIcon} ${expanded ? styles.expanded : ''}`}
        >
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      </div>

      {expanded && (
        <div className={styles.filterPanel}>
          <FilterRow
            label="风险等级"
            options={riskLevels}
            selected={filters.riskLevel}
            onSelect={(v) => onChange('riskLevel', v)}
          />
          <FilterRow
            label="基金公司"
            options={fundCompanies}
            selected={filters.company}
            onSelect={(v) => onChange('company', v)}
          />
          <FilterRow
            label="规模区间"
            options={scaleRanges.map(({ id, name }) => ({ id, name }))}
            selected={filters.scale}
            onSelect={(v) => onChange('scale', v)}
          />
        </div>
      )}
    </div>
  );
}
