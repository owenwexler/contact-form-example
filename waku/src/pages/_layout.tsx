import '../styles.css';

import type { ReactNode } from 'react';

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <title>Contact Form Example</title>
      <body>{children}</body>
    </html>
  );
}

export const getConfig = async () => {
  return {
    render: 'dynamic',
  } as const;
};
