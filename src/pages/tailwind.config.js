module.exports = {
    darkMode: ['class', '[data-theme="dark"]'],
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    corePlugins: { preflight: false, container: false },
    important: '#tailwind',
    theme: {
        extend: {
            screens: {
                'lg': '996px',
                // => @media (min-width: 996px) { ... }
            }
        }
    }
};