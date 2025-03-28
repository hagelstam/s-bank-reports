import { Navbar } from '@/components';
import { sBonusDisplay, sBonusUX } from '@/lib/fonts';
import '@/styles/globals.css';
import clsx from 'clsx';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'S-Bank Reports',
  description: 'Generate reports for S-Bank accounts',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(sBonusUX.variable, sBonusDisplay.variable)}>
      <body className="bg-background text-text-primary antialiased">
        <Navbar />
        <main className="mt-32">{children}</main>
      </body>
    </html>
  );
}
