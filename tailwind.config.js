/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dark, warm base tones
        ink: {
          950: '#0E0F0D',
          900: '#15130F',
          800: '#1C1812',
          700: '#241F18',
          600: '#2E2820',
        },
        // Gold / caramel accents
        gold: {
          DEFAULT: '#B48A4A',
          light: '#D6B06A',
          dark: '#8C6A38',
        },
        // Warm neutrals
        cream: '#F5F0E8',
        sand: '#BDB6AA',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      boxShadow: {
        premium: '0 30px 80px -20px rgba(0,0,0,0.65)',
        gold: '0 18px 50px -12px rgba(180,138,74,0.45)',
        card: '0 20px 50px -24px rgba(0,0,0,0.8)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D6B06A 0%, #B48A4A 50%, #8C6A38 100%)',
        'dark-fade': 'linear-gradient(180deg, rgba(14,15,13,0) 0%, rgba(14,15,13,0.85) 70%, #0E0F0D 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'steam-rise': {
          '0%': { opacity: '0', transform: 'translateY(0) scale(1)' },
          '50%': { opacity: '0.5' },
          '100%': { opacity: '0', transform: 'translateY(-40px) scale(1.4)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease forwards',
        shimmer: 'shimmer 6s linear infinite',
        'steam-rise': 'steam-rise 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
