import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      bgColor: '#f7f7f7',
      accentColor: 'rgba(255, 108, 0, 1)',
      cardColor: '#000',
      textColor: '#555555',
      textColorDarkBg: '#9DA4BD',
      mainLightColor: '#fff',
      mainDarkColor: '#303030',
      transparent: 'transparent',
    },
  },
  plugins: [],
};
export default config;
