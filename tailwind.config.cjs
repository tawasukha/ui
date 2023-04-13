const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ABeeZee", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "default": "rgb(var(--color-default) / <alpha-value>)",
        "offset": "rgb(var(--color-offset) / <alpha-value>)",

        "base": "rgb(var(--color-base) / <alpha-value>)",
        "base-1": "rgb(var(--color-base-1) / <alpha-value>)",
        "base-2": "rgb(var(--color-base-2) / <alpha-value>)",
        "base-3": "rgb(var(--color-base-3) / <alpha-value>)",
        "base-4": "rgb(var(--color-base-4) / <alpha-value>)",
        "base-5": "rgb(var(--color-base-5) / <alpha-value>)",

        "primary-1": "rgb(var(--color-primary-1) / <alpha-value>)",
        "primary-2": "rgb(var(--color-primary-2) / <alpha-value>)",
        "primary-3": "rgb(var(--color-primary-3) / <alpha-value>)",
        "primary-4": "rgb(var(--color-primary-4) / <alpha-value>)",
        "primary-5": "rgb(var(--color-primary-5) / <alpha-value>)",

        "secondary-1": "rgb(var(--color-secondary-1) / <alpha-value>)",
        "secondary-2": "rgb(var(--color-secondary-2) / <alpha-value>)",
        "secondary-3": "rgb(var(--color-secondary-3) / <alpha-value>)",
        "secondary-4": "rgb(var(--color-secondary-4) / <alpha-value>)",
        "secondary-5": "rgb(var(--color-secondary-5) / <alpha-value>)",

        "success-1": "rgb(var(--color-success-1) / <alpha-value>)",
        "success-2": "rgb(var(--color-success-2) / <alpha-value>)",
        "success-3": "rgb(var(--color-success-3) / <alpha-value>)",
        "success-4": "rgb(var(--color-success-4) / <alpha-value>)",
        "success-5": "rgb(var(--color-success-5) / <alpha-value>)",

        "warning-1": "rgb(var(--color-warning-1) / <alpha-value>)",
        "warning-2": "rgb(var(--color-warning-2) / <alpha-value>)",
        "warning-3": "rgb(var(--color-warning-3) / <alpha-value>)",
        "warning-4": "rgb(var(--color-warning-4) / <alpha-value>)",
        "warning-5": "rgb(var(--color-warning-5) / <alpha-value>)",

        "error-1": "rgb(var(--color-error-1) / <alpha-value>)",
        "error-2": "rgb(var(--color-error-2) / <alpha-value>)",
        "error-3": "rgb(var(--color-error-3) / <alpha-value>)",
        "error-4": "rgb(var(--color-error-4) / <alpha-value>)",
        "error-5": "rgb(var(--color-error-5) / <alpha-value>)",
      },
    },
  },
  plugins: [],
}