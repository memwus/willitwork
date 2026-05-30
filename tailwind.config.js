module.exports = {
  content: ["./src/**/*.{html,md,erb,serb,liquid}", "./frontend/**/*.js"],
  theme: {
    extend: {
      colors: {
        waypoints: {
          bg: "#0f0f0f", surface: "#1a1a1a", border: "#2a2a2a",
          text: "#e8e8e8", muted: "#888888", accent: "#c8a96e",
        },
      },
      fontFamily: {
        sans:  ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
}
