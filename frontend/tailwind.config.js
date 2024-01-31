/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      letterSpacing: {
        tighter: '-.075em',
        tight: '-.05em',
        normal: '0',
        wide: '.025em',
        wider: '.05em',
        widest: '.25em'
      },
      colors: {
        black_p: '#0C0D12',
        gray_p: '#555659',
        background_p: '#F9F5EA',
        cream_p: '#ECDFDB',
        shadow_home: '#7A6457',
        primary_p: '#CEAD95',
        second_p: '#F9F5EA',
        terciary_p: '#C9A489',
      },
      fontFamily: {
        'regular': ['Zilla-slab-Regular', 'sans-serif'],
        'medium': ['Zilla-slab-Medium', 'sans-serif'],
        'semibold': ['Zilla-slab-Semibold', 'sans-serif'],
        'bold': ['Zilla-slab-Bold', 'sans-serif'],
        'special': ['LaBelleAurore-Regular', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

