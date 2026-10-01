/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#120704',
        espresso: '#3D180C',
        terracotta: '#A74A21',
        'amber-glow': '#E3845A',
        peach: '#E3845A',
        offwhite: '#FFFFFF',
        'warm-muted': '#D1B8AE',
        
        deep: '#120704',
        surface: '#1B0C07',
        
        brand: {
          50: '#fdf6f3',
          100: '#fcebe3',
          200: '#f8d2c2',
          300: '#f3b097',
          400: '#ea8663',
          500: '#E3845A',
          600: '#A74A21',
          700: '#3D180C',
        },
        safe: '#34D399',
        warning: {
          brand: '#E3845A',
        },
        critical: '#F43F5E',
        industrial: {
          950: '#120704',
          900: '#1B0C07',
          850: '#2A130B',
          800: '#3D180C',
          700: '#5A2615',
          600: '#8A3B1C',
        }
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #E3845A 0%, #A74A21 50%, #3D180C 100%)',
        'warm-cinema': 'linear-gradient(135deg, #FFFFFF 0%, #E3845A 50%, #A74A21 100%)',
        'glow-radial': 'radial-gradient(circle at center, rgba(227, 132, 90, 0.2) 0%, transparent 70%)',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'scanline': 'scan 2.5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(0%)', opacity: '0.9' },
          '50%': { transform: 'translateY(100%)', opacity: '0.4' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
