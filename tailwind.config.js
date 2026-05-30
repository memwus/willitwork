module.exports = {
  content: ["./src/**/*.{html,md,erb,serb,liquid}", "./frontend/**/*.js"],
  theme: {
    extend: {
      colors: {
        waypoints: {
          bg:      "#0a0a0a",
          surface: "#111111",
          border:  "#1e1e1e",
          text:    "#d8d4cc",
          muted:   "#5a5650",
          dim:     "#3a3830",
          accent:  "#b8956a",
        },
      },
      fontFamily: {
        sans:    ["'Inter'", "system-ui", "-apple-system", "sans-serif"],
        serif:   ["'Cormorant Garamond'", "Georgia", "serif"],
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
}
