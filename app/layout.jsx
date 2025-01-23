'use client';

import { useState, createContext, useContext } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';

// Translations Object
const translations = {
  en: { lang: 'en' },
  pt: { lang: 'pt' },
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Language Context
export const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
});

// Language Toggle Component
export function LanguageToggle() {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
      className="ml-2 px-2 py-1 bg-emerald-100 dark:bg-emerald-700 rounded text-xs"
    >
      {language === 'en' ? 'PT' : 'EN'}
    </button>
  );
}

export default function RootLayout({ children }) {
  const [language, setLanguage] = useState('en');

  return (
    <html
      lang={translations[language].lang}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <title>TVDE Car Rentals</title>
        <meta
          name="description"
          content="Premium cars for ride-sharing services"
        />
      </head>
      <body className={geistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
          </LanguageContext.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
