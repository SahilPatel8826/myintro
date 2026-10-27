/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#030712',
          900: '#0b0f19',
          800: '#111827',
          700: '#1f2937',
          600: '#374151',
        },
        hud: {
          cyan: '#00f0ff',
          teal: '#00e5bc',
          orange: '#ff6b35',
          red: '#ff3366',
          amber: '#ffb703',
          purple: '#a855f7',
        },
        // Stitch semantic aliases mapped to our existing palette
        surface: {
          DEFAULT: '#0b0f19',
          dim: '#070a14',
          bright: '#1f2937',
          container: '#111827',
          'container-low': '#0e1422',
          'container-high': '#1a2234',
          'container-highest': '#242e44',
          'container-lowest': '#030712',
        },
        'on-surface': '#f1f5f9',
        'on-surface-variant': '#94a3b8',
        outline: '#64748b',
        'outline-variant': '#334155',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Space Mono"', 'ui-monospace', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 60s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { filter: 'drop-shadow(0 0 5px rgba(0,240,255,0.4))' },
          '100%': { filter: 'drop-shadow(0 0 15px rgba(0,240,255,0.85))' },
        }
      }
    },
  },
  plugins: [],
}
