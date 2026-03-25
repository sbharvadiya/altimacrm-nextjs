// app/layout.tsx
import type { Metadata } from 'next';
import Script from 'next/script';
import '../styles/globals.css';
import { GTMHeadScript, GTMNoScript } from '@/components/GTMScript';

export const metadata: Metadata = {
  title: 'Altima',
  description:
    'AltimaCRM provides startup Forex & CFD brokers with enterprise-grade operational infrastructure from day one.',
  icons: {
    icon: '/images/fav-icon.webp',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="cf-country" content="" />

        {/* Google Tag Manager */}
        <GTMHeadScript />

        {/* Cloudflare Turnstile */}
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
        />

        {/* Animate.css */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </head>
      <body>
        <GTMNoScript />
        {children}
      </body>
    </html>
  );
}
