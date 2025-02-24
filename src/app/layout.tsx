import { sBonusDisplay, sBonusUX } from '@/lib/fonts';
import '@/styles/globals.css';
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
    <html
      lang="en"
      className={`${sBonusUX.variable} ${sBonusDisplay.variable} antialiased`}
    >
      <body className="bg-background text-text-primary">{children}</body>
    </html>
  );
}
