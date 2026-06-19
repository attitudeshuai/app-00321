import type { Metadata, Viewport } from 'next';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: '金融理财 - 您的智能投资助手',
  description: '专业的证券基金投资平台，为您提供公募基金、私募基金、理财产品等全方位金融服务。',
  keywords: '基金,理财,投资,证券,公募基金,私募基金',
  authors: [{ name: 'Securities H5' }],
  icons: {
    icon: '/favicon.ico',
  },
  // 首页优化 - 预连接
  other: {
    'dns-prefetch': '//picsum.photos',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#1677FF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* 预连接优化 */}
        <link rel="preconnect" href="https://picsum.photos" />
        <link rel="dns-prefetch" href="https://picsum.photos" />
        {/* 首屏关键字体预加载 */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          as="style"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
