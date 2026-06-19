# 多阶段构建 - 跨平台支持 (ARM & X86)
# 使用官方 Node.js 镜像（支持多架构）
FROM --platform=$BUILDPLATFORM node:20-alpine AS base

# 安装依赖阶段
FROM base AS deps
WORKDIR /app

# 复制包管理文件
COPY package.json package-lock.json* ./

# 安装依赖（如果存在 package-lock.json 则使用 npm ci，否则使用 npm install）
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# 构建阶段
FROM base AS builder
WORKDIR /app

# 从依赖阶段复制 node_modules
COPY --from=deps /app/node_modules ./node_modules

# 复制源代码
COPY . .

# 设置环境变量
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# 构建应用
RUN npm run build

# 生产运行阶段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制构建产物
# standalone 模式已经包含了所有必要的文件
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 切换到非 root 用户
USER nextjs

# 暴露端口
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 启动应用（standalone 模式的 server.js 在 .next/standalone 目录）
CMD ["node", "server.js"]
