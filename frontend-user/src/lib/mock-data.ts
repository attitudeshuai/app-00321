// ================================
// Mock 数据 - 用于演示
// ================================

// 资产数据
export const assetData = {
  totalAsset: 156789.52,
  yesterdayProfit: 1234.56,
  totalProfit: 28956.78,
  profitRate: 22.65,
};

// 指数温度数据
export const indexTempData = [
  {
    id: '1',
    name: '上证指数',
    code: '000001',
    current: 3256.78,
    change: 1.25,
    temperature: 65,
  },
  {
    id: '2',
    name: '深证成指',
    code: '399001',
    current: 10856.32,
    change: -0.58,
    temperature: 48,
  },
  {
    id: '3',
    name: '创业板指',
    code: '399006',
    current: 2156.89,
    change: 2.35,
    temperature: 72,
  },
];

// 金刚区入口
export const quickEntries = [
  { id: '1', name: '公募基金', icon: '📈', path: '/fund-list' },
  { id: '2', name: '私募基金', icon: '🏦', path: '/fund-list' },
];

// 基金分类
export const fundCategories = [
  { id: 'all', name: '全部' },
  { id: 'stock', name: '股票型' },
  { id: 'mixed', name: '混合型' },
  { id: 'bond', name: '债券型' },
  { id: 'index', name: '指数型' },
  { id: 'money', name: '货币型' },
];

// 风险等级筛选项
export const riskLevels = [
  { id: 'all', name: '全部' },
  { id: 'low', name: '低风险' },
  { id: 'mid', name: '中风险' },
  { id: 'high', name: '高风险' },
];

// 基金公司筛选项
export const fundCompanies = [
  { id: 'all', name: '全部' },
  { id: 'huaxia', name: '华夏基金' },
  { id: 'efunds', name: '易方达基金' },
  { id: 'cmf', name: '招商基金' },
  { id: 'tianhong', name: '天弘基金' },
  { id: 'icbc', name: '工银瑞信' },
  { id: 'southern', name: '南方基金' },
  { id: 'jiashi', name: '嘉实基金' },
  { id: 'fullgoal', name: '富国基金' },
];

// 规模区间筛选项（单位：亿）
// 区间语义：[min, max)，左闭右开，确保边界值（如 10、50、100）只归属一档不重复计入
export const fundScaleRanges = [
  { id: 'all', name: '全部', min: -Infinity, max: Infinity },
  { id: 'lt10', name: '小于10亿', min: -Infinity, max: 10 },
  { id: '10to50', name: '10亿(含)-50亿', min: 10, max: 50 },
  { id: '50to100', name: '50亿(含)-100亿', min: 50, max: 100 },
  { id: 'gt100', name: '100亿及以上', min: 100, max: Infinity },
];

// 基金列表数据
export interface FundListItem {
  id: string;
  code: string;
  name: string;
  type: string;
  nav: number;
  dayChange: number;
  yearChange: number;
  risk: 'low' | 'mid' | 'high';
  companyId: string;
  companyName: string;
  scale: number; // 规模（亿）
}

export const fundListData: FundListItem[] = [
  {
    id: '001',
    code: '000001',
    name: '华夏成长混合',
    type: 'mixed',
    nav: 2.3456,
    dayChange: 2.35,
    yearChange: 28.56,
    risk: 'mid',
    companyId: 'huaxia',
    companyName: '华夏基金',
    scale: 156.78,
  },
  {
    id: '002',
    code: '000002',
    name: '易方达蓝筹精选混合',
    type: 'mixed',
    nav: 1.8965,
    dayChange: -1.25,
    yearChange: 15.68,
    risk: 'mid',
    companyId: 'efunds',
    companyName: '易方达基金',
    scale: 386.52,
  },
  {
    id: '003',
    code: '000003',
    name: '招商中证白酒指数',
    type: 'index',
    nav: 1.2568,
    dayChange: 0.85,
    yearChange: -5.23,
    risk: 'high',
    companyId: 'cmf',
    companyName: '招商基金',
    scale: 78.34,
  },
  {
    id: '004',
    code: '000004',
    name: '天弘余额宝货币',
    type: 'money',
    nav: 1.0000,
    dayChange: 0.01,
    yearChange: 2.15,
    risk: 'low',
    companyId: 'tianhong',
    companyName: '天弘基金',
    scale: 7568.92,
  },
  {
    id: '005',
    code: '000005',
    name: '工银瑞信纯债债券',
    type: 'bond',
    nav: 1.1256,
    dayChange: 0.12,
    yearChange: 4.56,
    risk: 'low',
    companyId: 'icbc',
    companyName: '工银瑞信',
    scale: 42.18,
  },
  {
    id: '006',
    code: '000006',
    name: '南方新经济股票',
    type: 'stock',
    nav: 3.5689,
    dayChange: 3.68,
    yearChange: 45.23,
    risk: 'high',
    companyId: 'southern',
    companyName: '南方基金',
    scale: 23.65,
  },
  {
    id: '007',
    code: '000007',
    name: '嘉实沪深300ETF联接',
    type: 'index',
    nav: 1.5236,
    dayChange: 1.12,
    yearChange: 12.36,
    risk: 'mid',
    companyId: 'jiashi',
    companyName: '嘉实基金',
    scale: 89.45,
  },
  {
    id: '008',
    code: '000008',
    name: '富国天惠成长混合',
    type: 'mixed',
    nav: 2.8956,
    dayChange: -0.56,
    yearChange: 22.15,
    risk: 'mid',
    companyId: 'fullgoal',
    companyName: '富国基金',
    scale: 8.92,
  },
];

// 基金详情数据
export const fundDetailData = {
  id: '001',
  code: '000001',
  name: '华夏成长混合',
  fullName: '华夏成长证券投资基金',
  type: '混合型-偏股',
  nav: 2.3456,
  accNav: 5.6789,
  dayChange: 2.35,
  
  // 基金经理（Unsplash 无版权真人肖像）
  manager: {
    name: '张经理',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop',
    experience: '8年',
    scale: '156.78亿',
    intro: '金融学硕士，8年证券从业经验，擅长成长股投资。',
  },
  
  // 历史业绩
  performance: {
    week: 1.25,
    month: 3.56,
    threeMonth: 8.96,
    sixMonth: 15.23,
    year: 28.56,
    threeYear: 85.23,
  },
  
  // 基金档案
  profile: {
    establishDate: '2005-06-30',
    scale: '156.78亿',
    custodian: '中国银行',
    company: '华夏基金',
    minPurchase: '10元',
    feeRate: '1.50%',
  },
  
  // 持仓
  holdings: [
    { name: '贵州茅台', code: '600519', ratio: 9.85 },
    { name: '宁德时代', code: '300750', ratio: 8.56 },
    { name: '隆基绿能', code: '601012', ratio: 7.23 },
    { name: '比亚迪', code: '002594', ratio: 6.85 },
    { name: '招商银行', code: '600036', ratio: 5.96 },
    { name: '中国平安', code: '601318', ratio: 5.23 },
    { name: '美的集团', code: '000333', ratio: 4.85 },
    { name: '恒瑞医药', code: '600276', ratio: 4.56 },
    { name: '海康威视', code: '002415', ratio: 4.23 },
    { name: '五粮液', code: '000858', ratio: 3.96 },
  ],
  
  // 交易规则
  tradeRules: {
    purchaseFee: '1.50%（1折后0.15%）',
    redeemFee: '0.50%（持有7天以上免费）',
    minPurchase: '10元',
    minHold: '10份',
    confirmDay: 'T+1',
    redeemDay: 'T+3',
  },
};

// 根据 id 获取基金详情数据
export function getFundDetailById(id: string) {
  // 查找对应的基金列表数据
  const fundList = fundListData.find(f => f.id === id);
  
  if (!fundList) {
    // 如果找不到，返回默认数据
    return fundDetailData;
  }
  
  // 根据基金列表数据生成详情数据
  return {
    ...fundDetailData,
    id: fundList.id,
    code: fundList.code,
    name: fundList.name,
    type: fundList.type === 'stock' ? '股票型' : 
          fundList.type === 'mixed' ? '混合型-偏股' :
          fundList.type === 'bond' ? '债券型' :
          fundList.type === 'index' ? '指数型' :
          fundList.type === 'money' ? '货币型' : '混合型',
    nav: fundList.nav,
    accNav: parseFloat((fundList.nav * 2.42).toFixed(4)), // 模拟累计净值
    dayChange: fundList.dayChange,
    performance: {
      week: parseFloat((fundList.dayChange * 0.5).toFixed(2)),
      month: parseFloat((fundList.dayChange * 1.5).toFixed(2)),
      threeMonth: parseFloat((fundList.yearChange * 0.3).toFixed(2)),
      sixMonth: parseFloat((fundList.yearChange * 0.5).toFixed(2)),
      year: fundList.yearChange,
      threeYear: parseFloat((fundList.yearChange * 3).toFixed(2)),
    },
  };
}

// 收益走势图数据生成
export function generateChartData(days: number = 30) {
  const data: { date: string; value: number }[] = [];
  let baseValue = 100;
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const change = (Math.random() - 0.45) * 3;
    baseValue = baseValue * (1 + change / 100);
    
    data.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      value: parseFloat(baseValue.toFixed(2)),
    });
  }
  
  return data;
}
