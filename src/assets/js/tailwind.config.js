tailwind.config = {
  content: [
    "./src/**/*.{html,js}",
    "../../**/*.{html,js}",
    "./node_modules/tw-elements/js/**/*.js"
  ],
    darkMode: "class",
    theme: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        body: ["Roboto", "sans-serif"],
        mono: ["ui-monospace", "monospace"],
      },
    },
    corePlugins: {
      preflight: false,
    },
    plugins: [
      function ({ addUtilities }) {
        const newUtilities = {
          '.custom-scrollbar::-webkit-scrollbar': {
            width: '5px',
          },
          '.custom-scrollbar::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '.custom-scrollbar::-webkit-scrollbar-thumb': {
            backgroundColor: '#475775',
            borderRadius: '100px',
          },
          '.custom-scrollbar::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#B3AFFF',
          },
        };
        addUtilities(newUtilities, ['responsive', 'hover']);
      },
    ],
  };