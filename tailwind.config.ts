import type { Config } from "tailwindcss";
import {PluginAPI} from "tailwindcss/types/config";

const config: Config = {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--font-sans)",
      },
    },
  },
  plugins: [
      function ({ addBase }: PluginAPI) {
          addBase({
              body: {
                  '@apply font-sans antialiased': {},
                  '-webkit-font-smoothing': 'antialiased',
                  '-moz-osx-font-smoothing': 'grayscale',
              },
          })
      }
  ],
};

export default config;
