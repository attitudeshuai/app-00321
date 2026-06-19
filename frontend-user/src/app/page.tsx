'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AssetCard from '@/components/asset-card';
import IndexTemp from '@/components/index-temp';
import QuickEntry from '@/components/quick-entry';
import { assetData, indexTempData, quickEntries } from '@/lib/mock-data';
import styles from './page.module.scss';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 模拟数据加载
    setIsLoaded(true);
  }, []);

  return (
    <div className={styles.page}>
      {/* 顶部状态栏占位 */}
      <div className={styles.statusBar} />
      
      {/* 头部区域 */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.greeting}>
            <h1 className={styles.title}>金融理财</h1>
            <p className={styles.subtitle}>您的智能投资助手</p>
          </div>
        </div>
      </header>

      {/* 主要内容区域 */}
      <main className={`${styles.main} ${isLoaded ? styles.loaded : ''}`}>
        {/* 资产卡片 */}
        <section className={styles.section} style={{ animationDelay: '0ms' }}>
          <AssetCard data={assetData} />
        </section>

        {/* 指数温度 */}
        <section className={styles.section} style={{ animationDelay: '100ms' }}>
          <IndexTemp data={indexTempData} />
        </section>

        {/* 金刚区 */}
        <section className={styles.section} style={{ animationDelay: '200ms' }}>
          <QuickEntry data={quickEntries} />
        </section>

        {/* 推荐基金区域 */}
        <section className={styles.section} style={{ animationDelay: '300ms' }}>
          <div className={styles.recommendSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>精选好基</h2>
            </div>
            <div className={styles.recommendList}>
              <Link href="/fund-detail/001" className={styles.recommendItem}>
                <div className={styles.fundName}>华夏成长混合</div>
                <div className={styles.fundChange}>+2.35%</div>
                <div className={styles.fundLabel}>近一年</div>
              </Link>
              <Link href="/fund-detail/002" className={styles.recommendItem}>
                <div className={styles.fundName}>易方达蓝筹</div>
                <div className={`${styles.fundChange} ${styles.fall}`}>-1.25%</div>
                <div className={styles.fundLabel}>近一年</div>
              </Link>
              <Link href="/fund-detail/006" className={styles.recommendItem}>
                <div className={styles.fundName}>南方新经济</div>
                <div className={styles.fundChange}>+3.68%</div>
                <div className={styles.fundLabel}>近一年</div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 底部安全区域 */}
      <div className={styles.safeAreaBottom} />
    </div>
  );
}
