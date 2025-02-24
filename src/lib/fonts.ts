import localFont from 'next/font/local';

export const sBonusDisplay = localFont({
  src: '../styles/fonts/SBonusDisplay-Bold.woff2',
  display: 'swap',
  variable: '--s-bonus-display',
});

export const sBonusUX = localFont({
  src: [
    {
      path: '../styles/fonts/SBonusUX-Regular.woff2',
      weight: '400',
    },
    {
      path: '../styles/fonts/SBonusUX-Medium.woff2',
      weight: '500',
    },
    {
      path: '../styles/fonts/SBonusUX-Bold.woff2',
      weight: '700',
    },
  ],
  display: 'swap',
  variable: '--s-bonus-ux',
});
