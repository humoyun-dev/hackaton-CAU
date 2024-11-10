/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./App.tsx"],
  darkMode: "class", // Enables dark mode using the `.dark` class
  theme: {
    extend: {
      colors: {
        // Background and Foreground
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Card and Popover
        card: "hsl(var(--card))",
        cardForeground: "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        popoverForeground: "hsl(var(--popover-foreground))",

        // Primary and Secondary
        primary: "hsl(var(--primary))",
        primaryForeground: "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        secondaryForeground: "hsl(var(--secondary-foreground))",

        // Muted, Accent, and Destructive
        muted: "hsl(var(--muted))",
        mutedForeground: "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        accentForeground: "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        destructiveForeground: "hsl(var(--destructive-foreground))",

        // Border, Input, and Ring
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // Chart Colors
        chart1: "hsl(var(--chart-1))",
        chart2: "hsl(var(--chart-2))",
        chart3: "hsl(var(--chart-3))",
        chart4: "hsl(var(--chart-4))",
        chart5: "hsl(var(--chart-5))",
      },
      borderRadius: {
        DEFAULT: "var(--radius)", // Use the custom radius variable
      },
    },
  },
  plugins: [],
};
