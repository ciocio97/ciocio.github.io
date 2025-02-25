/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        splitUp: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-2rem)", opacity: "1" },
        },
        splitDown: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(2rem)", opacity: "1" },
        },
        fadeSlideIn: {
          "0%": { transform: "translateX(-1rem)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeSlideInRight: {
          "0%": { transform: "translateX(1rem)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        "split-up": "splitUp 0.5s ease-out forwards",
        "split-down": "splitDown 0.5s ease-out forwards",
        "fade-slide-in": "fadeSlideIn 0.5s ease-out forwards",
        "fade-slide-in-right": "fadeSlideInRight 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
