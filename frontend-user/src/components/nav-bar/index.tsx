'use client';

import { useRouter } from 'next/navigation';
import styles from './index.module.scss';

interface NavBarProps {
  title: string;
  showBack?: boolean;
  rightContent?: React.ReactNode;
  transparent?: boolean;
}

export default function NavBar({ 
  title, 
  showBack = true, 
  rightContent,
  transparent = false 
}: NavBarProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={`${styles.navbar} ${transparent ? styles.transparent : ''}`}>
      <div className={styles.left}>
        {showBack && (
          <button className={styles.backBtn} onClick={handleBack} aria-label="返回">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
        )}
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.right}>{rightContent}</div>
    </div>
  );
}
