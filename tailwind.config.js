/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"primary-0": "#d4e7ff",
				"primary-1": "#1672ec",
				"primary-2": "#072d5f",
				"prm-btn-hover": "#1550a0",
				"green": '11CF00',
			},
		},
	},
	plugins: [],
};
