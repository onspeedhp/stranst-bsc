import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';
import Layout from '@/components/Layout';
import { Root } from '@/components/Root';

const raleway = Raleway({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Strant',
  description: 'Strant',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/image/favicon-strant-light.png',
        href: '/image/favicon-strant-light.png',
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
        url: '/image/favicon-strant-light.png',
        href: '/image/favicon-strant-light.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/image/favicon-strant-dark.png',
        href: '/image/favicon-strant-dark.png',
      },
    ],
    shortcut: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/image/favicon-strant-light.png',
        href: '/image/favicon-strant-light.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/image/favicon-strant-dark.png',
        href: '/image/favicon-strant-dark.png',
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
        <Root>
          <Layout>{children}</Layout>
        </Root>
      </body>
    </html>
  );
}
