/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // डार्क मोड क्लासेस को एक्टिव करने के लिए
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",   // क्योंकि app फोल्डर src के अंदर है
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // क्योंकि components बाहर रूट पर है
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",      // क्योंकि hooks बाहर रूट पर है
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}