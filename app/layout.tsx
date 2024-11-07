import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';
import Layout from '@/components/Layout';
// import { Root } from '@/components/Root';

const raleway = Raleway({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'STRANT – Smart AI Assistant for Investment & Education 🤖💼',
  description:
    'STRANT is a pioneering platform that applies artificial intelligence (AI) to support both investors and educational institutions.',
  keywords: 'Strant, NFT, SEO, TON',
  openGraph: {
    title: 'STRANT – Smart AI Assistant for Investment & Education 🤖💼',
    description:
      'STRANT is a pioneering platform that applies artificial intelligence (AI) to support both investors and educational institutions.',
    url: 'https://strant.io',
    images: [
      {
        url: 'https://strant.io/image/strant-og.jpg',
        alt: 'STRANT is a pioneering platform that applies artificial intelligence (AI) to support both investors and educational institutions.',
        width: 800,
        height: 354,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'STRANT – Smart AI Assistant for Investment & Education 🤖💼',
    description:
      'STRANT is a pioneering platform that applies artificial intelligence (AI) to support both investors and educational institutions.',
    images: [
      {
        url: 'https://strant.io/image/strant-og.jpg',
        alt: 'STRANT is a pioneering platform that applies artificial intelligence (AI) to support both investors and educational institutions.',
        width: 800,
        height: 354,
      },
    ],
  },
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/image/strant-og.png',
        href: '/image/strant-og.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/image/favicon-strant-dark.png',
        href: '/image/favicon-strant-dark.png',
      },
    ],
    apple: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/image/strant-og.png',
        href: '/image/strant-og.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/image/strant-og.png',
        href: '/image/strant-og.png',
      },
    ],
    shortcut: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/image/strant-og.png',
        href: '/image/favicon-strant-light.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/image/strant-og.png',
        href: '/image/strant-og.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.className} antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
