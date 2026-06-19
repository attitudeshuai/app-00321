# 证券理财 H5 移动端应用

基于 Next.js 14 + React 18 + SCSS + react-vant 构建的证券公司移动端 H5 应用。

## How to Run

### Docker 运行（推荐）

```bash
# 构建并启动容器
docker-compose up --build -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

访问 http://localhost:8081

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

### 生产构建

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm run start
```

## Services

| 服务 | 端口 | 说明 |
|------|------|------|
| 前端 H5 (Docker) | 8081 | Next.js 生产服务器（容器化） |
| 前端 H5 (本地) | 3000 | Next.js 开发服务器 |

## 测试账号

本项目为纯前端演示项目，无需登录账号。

## 题目内容

给我生成一个基于next react scss的移动端h5项目，是证券公司相关类h5, 目前先做三个页面，一个首页，一个基金列表页，一个基金详情页1. 首页有我的资产  指数温度  以及金刚区公募基金之类的快捷按钮2. 基金列表，顶部有导航栏，返回+标题，中间基金分类，下面是基金列表3. 基金详情页，顶部导航栏，返回+标题，下面的元素一次是基金名称  日涨跌幅  单位净值，基金经理，收益走势折线图 历史业绩  基金档案 基金持仓，交易规则项目构建方面：1. 相关依赖把echarts vant 装上2. 要求依赖分包，打包的时候支持资源压缩，gzip brotli压缩都可以，图片转webP3. 资源懒加载，类似于vue的路由懒加载4.首页优化方面的配置页加上

---

## 项目特性

### 技术栈

- **框架**: Next.js 14 (App Router)
- **UI 库**: react-vant 3.x
- **图表**: ECharts 5.x + echarts-for-react
- **样式**: SCSS Modules
- **语言**: TypeScript

### 性能优化

- **代码分包**: React、react-vant、ECharts 独立打包
- **资源压缩**: Gzip + Brotli 压缩
- **图片优化**: Next.js Image 组件自动转换 WebP
- **路由懒加载**: Next.js App Router 默认支持
- **图表懒加载**: 使用 `next/dynamic` 动态导入 ECharts

### 目录结构

```
securities-h5/
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── layout.tsx          # 根布局
│   │   ├── page.tsx            # 首页
│   │   ├── fund-list/          # 基金列表页
│   │   └── fund-detail/[id]/   # 基金详情页
│   ├── components/             # 公共组件
│   │   ├── nav-bar/            # 顶部导航栏
│   │   ├── asset-card/         # 资产卡片
│   │   ├── index-temp/         # 指数温度
│   │   ├── quick-entry/        # 金刚区快捷入口
│   │   ├── fund-card/          # 基金卡片
│   │   └── chart/              # ECharts 图表组件
│   ├── styles/                 # 全局样式
│   │   ├── variables.scss      # SCSS 变量
│   │   ├── mixins.scss         # SCSS 混入
│   │   └── globals.scss        # 全局样式
│   └── lib/                    # 工具函数
│       ├── utils.ts            # 通用工具
│       └── mock-data.ts        # Mock 数据
├── public/                     # 静态资源
├── next.config.js              # Next.js 配置
├── package.json
└── tsconfig.json
```

### UI 设计规范

- **主色调**: 金融蓝 #1677FF
- **涨跌色**: 红涨 #F5222D / 绿跌 #52C41A
- **字体层级**: H1 24px / H2 20px / Body 14px / Small 12px
- **卡片圆角**: 12px
- **间距系统**: 4/8/12/16/24px

### 页面预览

1. **首页** (`/`)
   - 渐变背景头部
   - 资产卡片（支持隐藏/显示）
   - 指数温度（上证、深证、创业板）
   - 金刚区快捷入口（8个入口）
   - 精选好基推荐

2. **基金列表页** (`/fund-list`)
   - 顶部导航栏
   - 分类标签（全部/股票型/混合型/债券型/指数型/货币型）
   - 基金列表卡片

3. **基金详情页** (`/fund-detail/[id]`)
   - 基金核心信息
   - 基金经理介绍
   - 收益走势折线图（支持切换时间范围）
   - 历史业绩表格
   - 基金档案
   - 前十大持仓
   - 交易规则
   - 底部申购按钮

## 开发命令

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build

# 启动生产服务
npm run start

# 代码检查
npm run lint
```
