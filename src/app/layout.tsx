import type { Metadata } from 'next';
import '../styles/globals.css';
import { sBonusDisplay, sBonusUX } from './fonts';

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
      <body className="bg-background text-text">{children}</body>
    </html>
  );
}
