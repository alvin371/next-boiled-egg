module.exports = {
    "./src/**/*.{ts,tsx}": () => "npx tsc --noEmit",

    "./src/**/*.{js,ts,tsx}": "eslint --fix",

    "./src/**/*.{js,ts,tsx,css,md}": "prettier --write",
};
