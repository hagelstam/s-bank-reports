import { Footer, Navbar } from '@/components';
import { IS_PROD } from '@/lib/constants';
import { sBonusDisplay, sBonusUX } from '@/lib/fonts';
import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/next';
import clsx from 'clsx';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'S-Bank Reports',
  description: 'Generate financial reports for S-Bank accounts',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(sBonusUX.variable, sBonusDisplay.variable)}>
      <body className="bg-background text-text-primary flex min-h-screen flex-col antialiased">
        <Navbar />
        <main className="container mx-auto my-16 max-w-[1024px] flex-grow px-4">
          {children}
        </main>
        <Footer />
        <Analytics mode={IS_PROD ? 'production' : 'development'} />;
      </body>
    </html>
  );
}
