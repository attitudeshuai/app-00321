'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import NavBar from '@/components/nav-bar';
import LineChart from '@/components/chart';
import { formatPercent, formatMoney } from '@/lib/utils';
import { getFundDetailById, generateChartData, fundDetailData } from '@/lib/mock-data';
import styles from './page.module.scss';

type TimeRange = '1m' | '3m' | '6m' | '1y' | 'all';

const timeRangeMap: Record<TimeRange, { label: string; days: number }> = {
  '1m': { label: '近1月', days: 30 },
  '3m': { label: '近3月', days: 90 },
  '6m': { label: '近6月', days: 180 },
  '1y': { label: '近1年', days: 365 },
  all: { label: '全部', days: 730 },
};

export default function FundDetailPage() {
  const params = useParams();
  const fundId = params?.id as string;
  const [activeTimeRange, setActiveTimeRange] = useState<TimeRange>('1m');
  
  // 根据路由参数获取基金数据
  const fund = useMemo(() => {
    if (fundId) {
      return getFundDetailById(fundId);
    }
    return fundDetailData;
  }, [fundId]);

  const chartData = useMemo(() => {
    return generateChartData(timeRangeMap[activeTimeRange].days);
  }, [activeTimeRange]);

  return (
    <div className={styles.page}>
      <NavBar title={fund.name} showBack={true} />

      {/* 基金名称 */}
      <section className={styles.coreInfo}>
        <div className={styles.fundHeader}>
          <h1 className={styles.fundName}>{fund.name}</h1>
          <span className={styles.fundType}>{fund.type}</span>
        </div>

        {/* 日涨跌幅和单位净值 */}
        <div className={styles.navInfo}>
          <div className={styles.navItem}>
            <span className={`${styles.navValue} ${fund.dayChange >= 0 ? styles.rise : styles.fall}`}>
              {formatPercent(fund.dayChange)}
            </span>
            <span className={styles.navLabel}>日涨跌幅</span>
          </div>
          <div className={styles.navDivider} />
          <div className={styles.navItem}>
            <span className={styles.navValue}>{fund.nav.toFixed(4)}</span>
            <span className={styles.navLabel}>单位净值</span>
          </div>
        </div>
      </section>

      {/* 基金经理 */}
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>基金经理</h2>
        <div className={styles.managerInfo}>
          <Image
            src={fund.manager.avatar}
            alt={fund.manager.name}
            width={56}
            height={56}
            className={styles.managerAvatar}
          />
          <div className={styles.managerDetail}>
            <div className={styles.managerName}>{fund.manager.name}</div>
            <div className={styles.managerStats}>
              <span>从业 {fund.manager.experience}</span>
              <span className={styles.dot}>·</span>
              <span>管理规模 {fund.manager.scale}</span>
            </div>
            <div className={styles.managerIntro}>{fund.manager.intro}</div>
          </div>
        </div>
      </section>

      {/* 收益走势 */}
      <section className={styles.card}>
        <div className={styles.chartHeader}>
          <div className={styles.timeRangeTabs}>
            {(Object.keys(timeRangeMap) as TimeRange[]).map((key) => (
              <button
                key={key}
                className={`${styles.timeRangeTab} ${activeTimeRange === key ? styles.active : ''}`}
                onClick={() => setActiveTimeRange(key)}
              >
                {timeRangeMap[key].label}
              </button>
            ))}
          </div>
        </div>
        <LineChart data={chartData} height={200} />
      </section>

      {/* 历史业绩 */}
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>历史业绩</h2>
        <div className={styles.performanceTable}>
          <div className={styles.performanceRow}>
            <span className={styles.performanceLabel}>近一周</span>
            <span className={`${styles.performanceValue} ${Number(fund.performance.week) >= 0 ? styles.rise : styles.fall}`}>
              {formatPercent(Number(fund.performance.week))}
            </span>
          </div>
          <div className={styles.performanceRow}>
            <span className={styles.performanceLabel}>近一月</span>
            <span className={`${styles.performanceValue} ${Number(fund.performance.month) >= 0 ? styles.rise : styles.fall}`}>
              {formatPercent(Number(fund.performance.month))}
            </span>
          </div>
          <div className={styles.performanceRow}>
            <span className={styles.performanceLabel}>近三月</span>
            <span className={`${styles.performanceValue} ${Number(fund.performance.threeMonth) >= 0 ? styles.rise : styles.fall}`}>
              {formatPercent(Number(fund.performance.threeMonth))}
            </span>
          </div>
          <div className={styles.performanceRow}>
            <span className={styles.performanceLabel}>近六月</span>
            <span className={`${styles.performanceValue} ${Number(fund.performance.sixMonth) >= 0 ? styles.rise : styles.fall}`}>
              {formatPercent(Number(fund.performance.sixMonth))}
            </span>
          </div>
          <div className={styles.performanceRow}>
            <span className={styles.performanceLabel}>近一年</span>
            <span className={`${styles.performanceValue} ${Number(fund.performance.year) >= 0 ? styles.rise : styles.fall}`}>
              {formatPercent(Number(fund.performance.year))}
            </span>
          </div>
          <div className={styles.performanceRow}>
            <span className={styles.performanceLabel}>近三年</span>
            <span className={`${styles.performanceValue} ${Number(fund.performance.threeYear) >= 0 ? styles.rise : styles.fall}`}>
              {formatPercent(Number(fund.performance.threeYear))}
            </span>
          </div>
        </div>
      </section>

      {/* 基金档案 */}
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>基金档案</h2>
        <div className={styles.profileGrid}>
          <div className={styles.profileItem}>
            <span className={styles.profileLabel}>成立日期</span>
            <span className={styles.profileValue}>{fund.profile.establishDate}</span>
          </div>
          <div className={styles.profileItem}>
            <span className={styles.profileLabel}>基金规模</span>
            <span className={styles.profileValue}>{fund.profile.scale}</span>
          </div>
          <div className={styles.profileItem}>
            <span className={styles.profileLabel}>托管银行</span>
            <span className={styles.profileValue}>{fund.profile.custodian}</span>
          </div>
          <div className={styles.profileItem}>
            <span className={styles.profileLabel}>基金公司</span>
            <span className={styles.profileValue}>{fund.profile.company}</span>
          </div>
          <div className={styles.profileItem}>
            <span className={styles.profileLabel}>最低申购</span>
            <span className={styles.profileValue}>{fund.profile.minPurchase}</span>
          </div>
          <div className={styles.profileItem}>
            <span className={styles.profileLabel}>管理费率</span>
            <span className={styles.profileValue}>{fund.profile.feeRate}</span>
          </div>
        </div>
      </section>

      {/* 基金持仓 */}
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>基金持仓（前十大）</h2>
        <div className={styles.holdingList}>
          {fund.holdings.map((holding, index) => (
            <div key={holding.code} className={styles.holdingItem}>
              <span className={styles.holdingRank}>{index + 1}</span>
              <div className={styles.holdingInfo}>
                <span className={styles.holdingName}>{holding.name}</span>
                <span className={styles.holdingCode}>{holding.code}</span>
              </div>
              <span className={styles.holdingRatio}>{holding.ratio.toFixed(2)}%</span>
            </div>
          ))}
        </div>
      </section>

      {/* 交易规则 */}
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>交易规则</h2>
        <div className={styles.ruleList}>
          <div className={styles.ruleItem}>
            <span className={styles.ruleLabel}>申购费率</span>
            <span className={styles.ruleValue}>{fund.tradeRules.purchaseFee}</span>
          </div>
          <div className={styles.ruleItem}>
            <span className={styles.ruleLabel}>赎回费率</span>
            <span className={styles.ruleValue}>{fund.tradeRules.redeemFee}</span>
          </div>
          <div className={styles.ruleItem}>
            <span className={styles.ruleLabel}>最低申购金额</span>
            <span className={styles.ruleValue}>{fund.tradeRules.minPurchase}</span>
          </div>
          <div className={styles.ruleItem}>
            <span className={styles.ruleLabel}>最低持有份额</span>
            <span className={styles.ruleValue}>{fund.tradeRules.minHold}</span>
          </div>
          <div className={styles.ruleItem}>
            <span className={styles.ruleLabel}>买入确认日</span>
            <span className={styles.ruleValue}>{fund.tradeRules.confirmDay}</span>
          </div>
          <div className={styles.ruleItem}>
            <span className={styles.ruleLabel}>赎回到账日</span>
            <span className={styles.ruleValue}>{fund.tradeRules.redeemDay}</span>
          </div>
        </div>
      </section>

      {/* 底部安全区域 */}
      <div className={styles.safeAreaBottom} />
    </div>
  );
}
