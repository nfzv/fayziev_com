const { themeVariants, prefersLight, prefersDark } = require("tailwindcss-theme-variants");

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      'white': "#fafafa"
    }
  },
  plugins: [
    themeVariants({
      themes: {
        light: {
          mediaQuery: prefersLight /* "@media (prefers-color-scheme: light)" */,
        },
        dark: {
          mediaQuery: prefersDark /* "@media (prefers-color-scheme: dark)" */,
        },
      },
    }),
  ],
}