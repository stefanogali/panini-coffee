import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        oliveGreen: "var(--oliveGreen)",
        orange:"var(--orange)"
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
       
      },
      animation: {
        spinWheel: 'spin 3s linear infinite',
       
      },
      margin: {
        'heading-margin-bottom-sm': 'calc(var(--headingMarginBottom) * 0.8)',
        'heading-margin-bottom': 'var(--headingMarginBottom)',
        'heading-margin-bottom-lg': 'calc(var(--headingMarginBottom) * 1.3)',
        'section-vertical': 'var(--sectionVerticalSpace)',
        'section-vertical-lg': 'calc(var(--sectionVerticalSpace) * 1.8)',
      },
      padding:{
        'half-container-padding-right': 'var(--textContainerPaddingRight)',
        'section-vertical': 'var(--sectionVerticalSpace)',
        'section-vertical-lg': 'calc(var(--sectionVerticalSpace) * 1.8)',
      },
      maxHeight: {
        'hero-max-height': '768px',
      },
      width: {
        'half-container-lg': 'calc(1024px/2)',
        'half-container-xl': 'calc(1280px/2)',
       }
    },
  },
  plugins: [],
};
export default config;
