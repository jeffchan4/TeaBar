/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                yellow: {
                    tea: "#E6BA24"
                },
                gray: {
                    tea: "#2f2f2f"
                }
            }
        },
    },
    plugins: [],
}

