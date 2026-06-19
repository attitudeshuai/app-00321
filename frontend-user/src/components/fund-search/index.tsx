'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './index.module.scss';

interface FundSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// 搜索输入组件内部实现防抖，不使用 @/lib/utils 中的通用 debounce 工具，原因如下：
// 1. 通用 debounce 在每次组件渲染时会重新创建闭包，导致 timer 引用不稳定，快速输入时会产生状态抖动
// 2. 需要通过 useRef 持久化 timer 和 onChange 回调引用，保证防抖函数在组件生命周期内引用稳定
// 3. 需要在组件卸载时清理 timer，防止内存泄漏
// 4. 清除按钮需要立即取消待执行的防抖搜索，内部实现可以直接访问 timer 进行精准控制
export default function FundSearch({ value, onChange, placeholder = '搜索基金名称或代码' }: FundSearchProps) {
  const [inputValue, setInputValue] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const debouncedOnChange = useCallback((val: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      onChangeRef.current(val);
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    debouncedOnChange(val);
  };

  const handleClear = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setInputValue('');
    onChange('');
  };

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchInputWrap}>
        <svg className={styles.searchIcon} viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
        <input
          type="text"
          className={styles.searchInput}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
        />
        {inputValue && (
          <button className={styles.clearBtn} onClick={handleClear} type="button">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
