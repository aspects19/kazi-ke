/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/*.{js,jsx,ts,tsx}", "./app/**/*.{tsx, ts}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#0B1B3F',     
        surface: '#152B57',        
        primary: '#FDB813',       
        secondary: '#3BA5F1',     
        accent: '#58C5ED',         
        foreground: '#FFFFFF',     
        muted: '#D3D3D3',          
        cloud: '#D4ECF7',          
        warning: '#FF8C00',       

        
        'on-primary': '#0B1B3F',   
        'on-surface': '#FFFFFF',
      }
    },
  },
  plugins: [],
}
