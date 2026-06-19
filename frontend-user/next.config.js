/** @type {import('next').NextConfig} */
const CompressionPlugin = require('compression-webpack-plugin');

const nextConfig = {
  // 启用严格模式
  reactStrictMode: true,

  // 输出模式 - 用于 Docker 部署
  output: 'standalone',

  // 图片优化配置 - 自动转换为 WebP
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    // 允许的外部图片域名
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },

  // SCSS 支持
  sassOptions: {
    includePaths: ['./src/styles'],
  },

  // 生产构建优化
  compiler: {
    // 移除 console.log (生产环境)
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 实验性功能
  experimental: {
    // 优化包导入
    optimizePackageImports: ['react-vant', 'echarts', 'echarts-for-react'],
  },

  // Webpack 配置 - 分包和压缩
  webpack: (config, { dev, isServer }) => {
    // 仅在生产环境客户端构建时应用
    if (!dev && !isServer) {
      // Gzip 压缩
      config.plugins.push(
        new CompressionPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8,
        })
      );

      // Brotli 压缩
      config.plugins.push(
        new CompressionPlugin({
          filename: '[path][base].br',
          algorithm: 'brotliCompress',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8,
        })
      );

      // 分包优化
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          // React 核心库
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react-vendor',
            priority: 40,
            reuseExistingChunk: true,
          },
          // react-vant 组件库
          reactVant: {
            test: /[\\/]node_modules[\\/]react-vant[\\/]/,
            name: 'react-vant-vendor',
            priority: 30,
            reuseExistingChunk: true,
          },
          // Echarts 图表库
          echarts: {
            test: /[\\/]node_modules[\\/](echarts|echarts-for-react|zrender)[\\/]/,
            name: 'echarts-vendor',
            priority: 30,
            reuseExistingChunk: true,
          },
          // 其他第三方库
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      };
    }

    return config;
  },

  // 性能优化 - 页面静态生成
  poweredByHeader: false,
  
  // 压缩输出
  compress: true,

  // 生成源码映射（生产环境禁用以减小体积）
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
