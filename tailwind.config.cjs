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
        "default": "var(--color-default)",
        "default-1": "var(--color-default-1)",
        "default-2": "var(--color-default-2)",
        "default-3": "var(--color-default-3)",
        "default-4": "var(--color-default-4)",
        "default-5": "var(--color-default-5)",

        "primary-1": "var(--color-primary-1)",
        "primary-2": "var(--color-primary-2)",
        "primary-3": "var(--color-primary-3)",
        "primary-4": "var(--color-primary-4)",
        "primary-5": "var(--color-primary-5)",

        "secondary-1": "var(--color-secondary-1)",
        "secondary-2": "var(--color-secondary-2)",
        "secondary-3": "var(--color-secondary-3)",
        "secondary-4": "var(--color-secondary-4)",
        "secondary-5": "var(--color-secondary-5)",

        "success-1": "var(--color-success-1)",
        "success-2": "var(--color-success-2)",
        "success-3": "var(--color-success-3)",
        "success-4": "var(--color-success-4)",
        "success-5": "var(--color-success-5)",

        "warning-1": "var(--color-warning-1)",
        "warning-2": "var(--color-warning-2)",
        "warning-3": "var(--color-warning-3)",
        "warning-4": "var(--color-warning-4)",
        "warning-5": "var(--color-warning-5)",

        "error-1": "var(--color-error-1)",
        "error-2": "var(--color-error-2)",
        "error-3": "var(--color-error-3)",
        "error-4": "var(--color-error-4)",
        "error-5": "var(--color-error-5)",
      },
    }
  },
  plugins: [],
}