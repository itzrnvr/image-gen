// tailwind.config.js
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports =  withMT({
	content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
	extend: {},
	},
	variants: {
	extend: {},
	},
	plugins: [],
});
