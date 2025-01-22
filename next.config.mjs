/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.placeholder.com', 'your-domain.com'], // Substituir pelos domínios corretos
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config) => {
    // Garantir que ScrollReveal seja tratado corretamente
    config.externals = [...config.externals, { scrollreveal: 'ScrollReveal' }];
    return config;
  },
};

export default nextConfig;
