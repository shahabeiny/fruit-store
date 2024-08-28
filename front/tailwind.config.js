/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ], darkMode: "class",
  theme: {
    extend: {
      spacing: {
        30: "7.5rem",
      },
      colors: {
        brown: {
          100: "#ECE0D1",
          300: "#DBC1AC",
          600: "#967259",
          900: "#634832",
        },
        modal:"rgba(0, 0, 0, 60%)"
      },
      boxShadow: {
        normal: "0px 1px 10px rgba(0,0,0,0.05)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
        "7xl": "3.5rem",
        "8xl": "4rem",
      },
      fontFamily: {
        Dana: ['var(--dana-regular)'],
        DanaMedium: ['var(--dana-medium)'],
        DanaDemiBold: ['var(--dana-demi-bold)'],
        MorabbaLight: ['var(--morabba-light)'],
        MorabbaMedium: ['var(--morabba-medium)'],
        MorabbaBold: ['var(--morabba-bold)'],
      },
      letterSpacing: {
        tightest: "-0.065em",
      },
      spacing:{
        "4.5":"1.125rem",
        "25":"6.25rem",
        "30":"7.5rem",
        "50":"12.5rem"
      },
      zIndex:{
        '5':'5'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          lg: "0.625rem",
        },
      },
    },
    screens: {
      sx:"380px",
      xs:"480px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem", // mobile
        lg: "0.625rem", // 10px
      },
    },
    backgroundImage:{
      "home-desktop":"url(images/firstbanner.webp)"
    }
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "&>*");
      addVariant("child-hover", "&>*:hover");
    },
  ],
}
