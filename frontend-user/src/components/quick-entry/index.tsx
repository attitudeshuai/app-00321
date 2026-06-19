'use client';

import Link from 'next/link';
import styles from './index.module.scss';

interface EntryItem {
  id: string;
  name: string;
  icon: string;
  path: string;
}

interface QuickEntryProps {
  data: EntryItem[];
}

export default function QuickEntry({ data }: QuickEntryProps) {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {data.map((item) => (
          <Link key={item.id} href={item.path} className={styles.entryItem}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>{item.icon}</span>
            </div>
            <span className={styles.name}>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
