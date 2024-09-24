import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';
import Layout from '@/components/Layout';
import { Root } from '@/components/Root';

const raleway = Raleway({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Strant',
  description: 'Strant',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${raleway.className} antialiased`}>
        <Root>
          <Layout>{children}</Layout>
        </Root>
      </body>
    </html>
  );
}
