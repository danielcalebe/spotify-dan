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
      }
    }
      
}


