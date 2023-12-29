/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				info: '#16B1FF',
				danger: '#FF4C51',
				warning: '#FFB400',
				confirm: '#56CA00',
			},
		},
	},
	plugins: [],
};
