import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from './theme-provider';
import { headers } from 'next/headers';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata() {
  const headersList = headers();
  const domain = headersList.get('host');

  return {
    title: 'TVDE Car Rentals | Premium Cars for Ride-sharing Services',
    description:
      'Rent premium cars for TVDE services. We offer Tesla, BMW, and Mercedes models for professional drivers.',
    keywords: [
      'TVDE rental',
      'Uber cars',
      'Bolt cars',
      'car rental',
      'ride-sharing',
    ],
    openGraph: {
      title: 'TVDE Car Rentals',
      description: 'Premium cars for ride-sharing services',
      url: `https://${domain}`,
      siteName: 'TVDE Rentals',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'TVDE Car Rentals',
      description: 'Premium cars for ride-sharing services',
    },
    viewport: 'width=device-width, initial-scale=1',
    robots: 'index, follow',
  };
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
      </head>
      <body className={geistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
