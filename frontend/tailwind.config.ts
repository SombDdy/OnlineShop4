/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "istok-web": ["Istok Web", "sans-serif"],
        'ibm': ['IBM Plex Sans Thai Looped'],
        'montserrat': ["Montserrat", "sans-serif"],
        'onest' : ["OwnOnest"]
      },
      height: {
        
      },
      width: {
        
      },
      screens: {
        xs: "360px",
        xs2: "380px",
        sm: "576px",
        md: "768px",
        md2: "1000px",
        lg: "1280px",
        xl: "1600px",
        "2xl": "1920px",
      },
      fontSize: {
      },
      colors: {
        'bg-black': '#1A1A1A',
        'bg-light': '#28282A',
        'bg-grey': '#363638',
        'text' : '#F9F9F9',
        'text-light' : '#909090',
        'text-lightblue' : '#B6CCDA',
        'text-green' : '#008000',
        'text-red' : '#ff0000',
        'stroke-light' : '#666666',
        'pink': '#FFBCAD',
        'ellipse': '#D9D9D9',
        'violet': '#814ADC',
        'violet-light': "#D6B4FC",
        'purple': '#6D3FB8',
        'button-blue': '#0071E3',
        'blue': '#4158D0',
        'naturel': '#A29D93',
        'space': '#868789',
      },
      gradientColorStops: {
        
      },
      borderRadius: {
  
      },
      backgroundImage: {
      },
      extend: {
        textStyles: {
          'custom': {
            base: 'text-black text-xl font-semibold'
          }
        },
      }
    },
  },
  plugins: [
  ],
};
