import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito Sans', 'sans-serif',],
      },
    },
  },
  plugins: [
      function ({ addBase }: { addBase: (styles: Record<string, any>) => void }) {
          addBase({
              body: {
                  '@apply font-sans antialiased': {},
                  '-webkit-font-smoothing': 'antialiased',
                  '-moz-osx-font-smoothing': 'grayscale',
              },
          })
      }
  ],
} satisfies Config;
