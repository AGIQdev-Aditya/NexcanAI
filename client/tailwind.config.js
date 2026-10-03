/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury Architectural Swatch Palette:
        // #F9F8F6 (Canvas Base), #EFE9E3 (Surface Card), #D9CFC7 (Border/Divider), #C9B59C (Camel Gold Accent)
        canvas: '#F9F8F6',
        pearl: '#EFE9E3',
        sandstone: '#D9CFC7',
        camel: {
          DEFAULT: '#C9B59C',
          50: '#FBF9F7',
          100: '#F5F1EC',
          200: '#E9E0D6',
          300: '#DCCEC0',
          400: '#D2C1AE',
          500: '#C9B59C',
          600: '#B8A389',
          700: '#A38E73',
          800: '#826F57',
          900: '#5F503D',
        },
        ink: {
          DEFAULT: '#1C1815',
          primary: '#1C1815',
          secondary: '#6B5E55',
          muted: '#8C7D73',
          subtle: '#B5A89E',
        },
        // Aliases for comprehensive backwards compatibility with high-contrast luxury styling
        obsidian: '#F9F8F6',
        surface: '#EFE9E3',
        espresso: '#D9CFC7',
        terracotta: '#C9B59C',
        'amber-glow': '#C9B59C',
        peach: '#C9B59C',
        offwhite: '#1C1815',
        'warm-muted': '#6B5E55',
        
        deep: '#F9F8F6',
        
        brand: {
          50: '#FBF9F7',
          100: '#F5F1EC',
          200: '#E9E0D6',
          300: '#DCCEC0',
          400: '#D2C1AE',
          500: '#C9B59C',
          600: '#B8A389',
          700: '#A38E73',
        },
        safe: '#16A34A',
        warning: {
          brand: '#C9B59C',
        },
        critical: '#DC2626',
        industrial: {
          950: '#F9F8F6',
          900: '#EFE9E3',
          850: '#E5DED7',
          800: '#D9CFC7',
          700: '#C9B59C',
          600: '#A38E73',
        }
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #EFE9E3 0%, #D9CFC7 50%, #C9B59C 100%)',
        'warm-cinema': 'linear-gradient(135deg, #1C1815 0%, #6B5E55 50%, #C9B59C 100%)',
        'glow-radial': 'radial-gradient(circle at center, rgba(201, 181, 156, 0.25) 0%, transparent 70%)',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'scanline': 'scan 2.5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spotlight': 'spotlight 2.2s ease 0.2s 1 forwards',
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
        spotlight: {
          '0%': {
            opacity: '0',
            transform: 'translate(-72%, -62%) scale(0.6)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%, -40%) scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
}
