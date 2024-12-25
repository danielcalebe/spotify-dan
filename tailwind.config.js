/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],



    theme: {
      extend: {
        fontSize: {
          'xxs': '0.5rem',  // Definindo um tamanho menor que o 'xs'
        },
      },
    },
    plugins: [],
 

    theme: {
      extend: {
        keyframes: {
          move: {
            '0%': { transform: 'translateY(0)' },
            '100%': { transform: 'translateY(-50px)' } 
          }
        },
        animation: {
          move: 'move 1s ease-in-out' 
        }
      },

      theme: {
        fontWeight: {
          search: '420',
          thin: '100',
          hairline: '100',
          extralight: '200',
          light: '300',
          normal: '400',
          medium: '500',
          semibold: '600',
          bold: '700',
          extrabold: '800',
          'extra-bold': '800',
          black: '900',
        }
      },

      theme: {
        screens: {
          '2xs': '200',
          'sm': '640px',
          // => @media (min-width: 640px) { ... }
    
          'md': '768px',
          // => @media (min-width: 768px) { ... }
    
          'lg': '1024px',
          // => @media (min-width: 1024px) { ... }
    
          'xl': '1280px',
          // => @media (min-width: 1280px) { ... }
    
          '2xl': '1536px',
          // => @media (min-width: 1536px) { ... }
        }
      }


    }
      

    
}


