/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}", "./ArtifactView.tsx"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
          deep: "hsl(var(--primary-deep))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          soft: "hsl(var(--accent-soft))",
          gradient: "hsl(var(--accent))",
        },
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        soft: "hsl(var(--soft))",
      },
      backgroundImage: {
        hero: "linear-gradient(135deg, hsl(var(--primary-deep)) 0%, hsl(var(--primary)) 60%, hsl(var(--primary-glow)) 100%)",
        "accent-gradient": "linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--accent-warm)) 100%)",
      },
      boxShadow: {
        elegant: "0 4px 24px -4px hsl(var(--primary) / 0.18), 0 1px 4px -1px hsl(var(--primary) / 0.10)",
        soft: "0 2px 12px -2px hsl(var(--primary) / 0.10), 0 1px 3px -1px hsl(var(--border) / 0.40)",
      },
      ringColor: {
        glow: "hsl(var(--primary) / 0.40)",
      },
    },
  },
  plugins: [],
};
