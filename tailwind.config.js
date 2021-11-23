module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        headline: ['SF Pro TH', 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        sans: ['SF Pro TH', 'SF Pro Text', 'Sukhumvit Set', 'Myriad Set Pro', 'SF Pro Icons', 'Apple Legacy Chevron', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
