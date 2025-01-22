'use client';

import { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { ThemeToggle } from './components/theme-toggle';
import debounce from 'lodash.debounce';

// Moved cars data outside component
const cars = [
  {
    id: 1,
    model: 'Kia Niro EV',
    image: '/kianiro.jpg',
    status: 'Available',
    price: '€75/day',
  },
  {
    id: 2,
    model: 'BMW 5 Series',
    image: '/kianiro.jpg',
    status: 'Reserved',
    price: '€65/day',
  },
  {
    id: 3,
    model: 'Mercedes E-Class',
    image: '/kianiro.jpg',
    status: 'Available',
    price: '€70/day',
  },
];

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
    </div>
  );
}

// Separate component for scroll-to-top button
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
      className={`fixed bottom-8 right-8 bg-emerald-600 dark:bg-emerald-700 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      ↑
    </button>
  );
}

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const toggleVisible = debounce(() => {
      setVisible(window.scrollY > 300);
    }, 100);

    window.addEventListener('scroll', toggleVisible);

    // Optional: Initialize ScrollReveal on client-side only
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

  // Handle initial SSR render
  if (!mounted) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-gray-900 transition-colors duration-200">
      <header className="fixed w-full bg-white dark:bg-gray-800 shadow-md z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400">
                TVDE Rentals
              </h1>
              <div className="flex items-center gap-4">
                <Image
                  src="/bolt-logo.png"
                  alt="Bolt Logo"
                  width={80}
                  height={30}
                  className="h-8 w-auto object-contain"
                />
                <Image
                  src="/uber-logo.png"
                  alt="Uber Logo"
                  width={80}
                  height={30}
                  className="h-8 w-auto object-contain"
                />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <a
                href="#cars"
                className="hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                Cars
              </a>
              <a
                href="#contact"
                className="hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                Contact
              </a>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-12 bg-gradient-to-b from-emerald-900 to-emerald-700 dark:from-emerald-950 dark:to-emerald-900 text-white">
          <div className="container mx-auto px-6 py-20 reveal">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Drive with Confidence
              </h2>
              <p className="text-xl mb-8">
                Premium cars for your TVDE service. Start earning today!
              </p>
              <button className="bg-white dark:bg-emerald-300 text-emerald-800 dark:text-emerald-900 px-8 py-3 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-200 transition">
                Get Started
              </button>
            </div>
          </div>
        </section>

        {/* Cars Section */}
        <section id="cars" className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-emerald-800 dark:text-emerald-400 mb-12 reveal">
              Available Cars
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {cars.map((car) => (
                <div
                  key={car.id}
                  className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden reveal"
                >
                  <div className="relative h-48">
                    <Image
                      src={car.image}
                      alt={car.model}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      priority={car.id === 1}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-emerald-800 dark:text-emerald-400">
                      {car.model}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      {car.price}
                    </p>
                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
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

        {/* Contact Form Section */}
        <section id="contact" className="py-20 bg-emerald-50 dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 reveal">
              <h2 className="text-3xl font-bold text-emerald-800 dark:text-emerald-400 mb-8 text-center">
                Contact Us
              </h2>
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Message sent successfully!');
                }}
              >
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    rows="4"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 dark:bg-emerald-700 text-white py-3 rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-emerald-900 dark:bg-gray-950 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TVDE Rentals</h3>
              <p className="text-emerald-200 dark:text-emerald-300">
                Premium car rental service for TVDE drivers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#cars"
                    className="text-emerald-200 dark:text-emerald-300 hover:text-white"
                  >
                    Cars
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-emerald-200 dark:text-emerald-300 hover:text-white"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Info</h3>
              <p className="text-emerald-200 dark:text-emerald-300">
                Email: info@tvderentals.com
              </p>
              <p className="text-emerald-200 dark:text-emerald-300">
                Phone: +351 123 456 789
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTopButton visible={visible} />
    </div>
  );
}
