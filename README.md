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
# 进入项目目录
cd frontend-user

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

### 生产构建

```bash
# 进入项目目录
cd frontend-user

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

## 项目结构

```
label-00321/
├── README.md                    # 项目说明文档
├── docker-compose.yml           # Docker Compose 配置
├── .gitignore                   # Git 忽略文件
└── frontend-user/               # 用户端 H5 项目
    ├── package.json
    ├── Dockerfile               # Docker 构建文件
    ├── src/
    ├── config/
    └── ...
```