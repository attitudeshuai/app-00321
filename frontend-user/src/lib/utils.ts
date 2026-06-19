// ================================
// 工具函数
// ================================

/**
 * 格式化金额
 * @param value 金额数值
 * @param decimals 小数位数
 * @returns 格式化后的金额字符串
 */
export function formatMoney(value: number, decimals: number = 2): string {
  if (isNaN(value)) return '--';
  
  const sign = value < 0 ? '-' : '';
  const absValue = Math.abs(value);
  
  if (absValue >= 100000000) {
    return `${sign}${(absValue / 100000000).toFixed(2)}亿`;
  } else if (absValue >= 10000) {
    return `${sign}${(absValue / 10000).toFixed(2)}万`;
  }
  
  return `${sign}${absValue.toFixed(decimals)}`;
}

/**
 * 格式化涨跌幅
 * @param value 涨跌幅数值
 * @param showSign 是否显示正负号
 * @returns 格式化后的涨跌幅字符串
 */
export function formatPercent(value: number, showSign: boolean = true): string {
  if (isNaN(value)) return '--';
  
  const sign = showSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

/**
 * 格式化日期
 * @param date 日期对象或字符串
 * @param format 格式化模板
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date | string, format: string = 'YYYY-MM-DD'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) return '--';
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day);
}

/**
 * 获取涨跌颜色类名
 * @param value 数值
 * @returns 颜色类名
 */
export function getChangeColorClass(value: number): string {
  if (value > 0) return 'text-rise';
  if (value < 0) return 'text-fall';
  return 'text-tertiary';
}

/**
 * 延迟函数
 * @param ms 毫秒数
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 生成随机 ID
 * @param length 长度
 */
export function generateId(length: number = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
