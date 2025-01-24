'use client';

import { useContext, useState, useEffect } from 'react';
import { LanguageContext } from './layout';
import Image from 'next/image';
import { ThemeToggle } from './components/theme-toggle';
import debounce from 'lodash.debounce';
import { cars } from './data/cars';
import { translations } from './data/translations';

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
    </div>
  );
}
function ScrollToTopButton({ visible }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 bg-yellow-300 dark:bg-yellow-400 text-gray-400 p-4 rounded-full shadow-lg hover:bg-yellow-600 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      ↑
    </button>
  );
}
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
function LanguageToggle() {
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

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  useEffect(() => {
    setMounted(true);
    const toggleVisible = debounce(() => {
      setVisible(window.scrollY > 300);
    }, 100);
    window.addEventListener('scroll', toggleVisible);
    const initScrollReveal = async () => {
      const ScrollReveal = (await import('scrollreveal')).default;
      const sr = ScrollReveal({
        origin: 'bottom',
        distance: '20px',
        duration: 1000,
        reset: true,
      });
      sr.reveal('.reveal', { interval: 200 });
    };
    initScrollReveal().catch(console.error);
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  if (!mounted) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-gray-900 transition-colors duration-200">
      <header className="fixed w-full bg-white dark:bg-gray-800 shadow-md z-50">
        <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center sm:justify-start">
              <h1 className="text-xl sm:text-2xl font-bold text-emerald-800 dark:text-emerald-400 text-center sm:text-left">
                TVDE Rentals
              </h1>
              <div className="flex items-center gap-4">
                <Image
                  src="/bolt-logo.png"
                  alt="Bolt Logo"
                  width={80}
                  height={30}
                  className="h-6 sm:h-8 w-auto object-contain"
                />
                <Image
                  src="/uber-logo.png"
                  alt="Uber Logo"
                  width={80}
                  height={30}
                  className="h-6 sm:h-8 w-auto object-contain"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 sm:space-x-6">
              <a
                href="#cars"
                className="text-sm sm:text-base hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                Cars
              </a>
              <a
                href="#contact"
                className="text-sm sm:text-base hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                Contact
              </a>
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="pt-16 sm:pt-24 pb-8 sm:pb-12 bg-gradient-to-b from-emerald-900 to-emerald-700 dark:from-emerald-950 dark:to-emerald-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 reveal">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
                {t.heroTitle}
              </h2>
              <p className="text-base sm:text-xl mb-6 sm:mb-8 px-4 sm:px-0">
                {t.heroSubtitle}
              </p>
              <button
                className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-white dark:bg-emerald-300 text-emerald-800 dark:text-emerald-900 rounded-full hover:bg-yellow-100 dark:hover:bg-emerald-200 transition"
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                {t.getStarted}
              </button>
            </div>
          </div>
        </section>

        <section id="cars" className="py-12 sm:py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-emerald-800 dark:text-emerald-400 mb-8 sm:mb-12 reveal">
              {t.availableCars}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {cars.map((car) => (
                <div
                  key={car.id}
                  className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden reveal"
                >
                  <div className="relative h-48 sm:h-56">
                    <Image
                      src={car.image}
                      alt={car.model}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                      priority={car.id === 1}
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-emerald-800 dark:text-emerald-400">
                      {car.model}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">
                      {car.price}
                    </p>
                    <span
                      className={`inline-block mt-2 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
                        car.status === 'Available'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}
                    >
                      {car.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="py-12 sm:py-20 bg-emerald-50 dark:bg-gray-900"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-xl sm:max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 reveal">
              <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 dark:text-emerald-400 mb-6 sm:mb-8 text-center">
                {t.contactUs}
              </h2>
              <form
                className="space-y-4 sm:space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Message sent successfully!');
                }}
              >
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                    {t.name}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                    {t.message}
                  </label>
                  <textarea
                    required
                    className="w-full px-3 sm:px-4 py-2 text-sm border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    rows="4"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full text-sm sm:text-base bg-emerald-600 dark:bg-emerald-700 text-white py-2 sm:py-3 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition"
                >
                  {t.send}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-emerald-900 dark:bg-gray-950 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                TVDE Rentals
              </h3>
              <p className="text-sm sm:text-base text-emerald-200 dark:text-emerald-300">
                {t.footerDescription}
              </p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                {t.links}
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#cars"
                    className="text-sm sm:text-base text-emerald-200 dark:text-emerald-300 hover:text-white"
                  >
                    {t.cars}
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-sm sm:text-base text-emerald-200 dark:text-emerald-300 hover:text-white"
                  >
                    {t.contact}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                {t.contactInfo}
              </h3>
              <p className="text-sm sm:text-base text-emerald-200 dark:text-emerald-300">
                Email: info@tvderentals.com
              </p>
              <p className="text-sm sm:text-base text-emerald-200 dark:text-emerald-300">
                Phone: +351 123 456 789
              </p>
            </div>
          </div>
        </div>
      </footer>

      <ScrollToTopButton visible={visible} />
    </div>
  );
}
