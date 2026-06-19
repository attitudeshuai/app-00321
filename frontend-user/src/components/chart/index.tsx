'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import styles from './index.module.scss';

// 懒加载 echarts-for-react
const ReactECharts = dynamic(() => import('echarts-for-react'), { 
  ssr: false,
  loading: () => <div className={styles.loading}>加载中...</div>
});

interface ChartData {
  date: string;
  value: number;
}

interface LineChartProps {
  data: ChartData[];
  title?: string;
  height?: number;
  color?: string;
}

export default function LineChart({ 
  data, 
  title,
  height = 240,
  color = '#1677FF'
}: LineChartProps) {
  const option = useMemo(() => ({
    title: title ? {
      text: title,
      textStyle: {
        fontSize: 14,
        fontWeight: 500,
        color: '#1F1F1F',
      },
      left: 0,
      top: 0,
    } : undefined,
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#E8E8E8',
      borderWidth: 1,
      textStyle: {
        color: '#1F1F1F',
        fontSize: 12,
      },
      formatter: (params: { name: string; value: number }[]) => {
        const item = params[0];
        const changeValue = item.value - 100;
        const changeColor = changeValue >= 0 ? '#F5222D' : '#52C41A';
        const sign = changeValue >= 0 ? '+' : '';
        return `
          <div style="padding: 4px 0;">
            <div style="color: #999; font-size: 11px;">${item.name}</div>
            <div style="font-size: 14px; font-weight: 500;">
              净值: ${item.value.toFixed(2)}
            </div>
            <div style="color: ${changeColor}; font-size: 12px;">
              收益: ${sign}${changeValue.toFixed(2)}%
            </div>
          </div>
        `;
      },
    },
    grid: {
      left: 0,
      right: 8,
      top: title ? 40 : 20,
      bottom: 24,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.date),
      boundaryGap: false,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#999',
        fontSize: 10,
        interval: Math.floor(data.length / 5),
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: '#F0F0F0',
          type: 'dashed',
        },
      },
      axisLabel: {
        color: '#999',
        fontSize: 10,
        formatter: (value: number) => value.toFixed(0),
      },
    },
    series: [
      {
        type: 'line',
        data: data.map(item => item.value),
        smooth: true,
        symbol: 'none',
        lineStyle: {
          color: color,
          width: 2,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: `${color}33` },
              { offset: 1, color: `${color}05` },
            ],
          },
        },
      },
    ],
  }), [data, title, color]);

  return (
    <div className={styles.chartContainer} style={{ height }}>
      <ReactECharts
        option={option}
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
}
