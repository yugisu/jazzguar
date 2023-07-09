import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	corePlugins: {
		active: false, // Disabling to override specificity.
	},
	theme: {
		fontFamily: {
			sans: ['Inter var, Inter, sans-serif'],
		},

		extend: {},
	},
	plugins: [
		plugin(({ addVariant }) => {
			addVariant('hocus', ['&:hover', '&:focus-visible']);
			addVariant('group-hocus', ['.group:hover &', '.group:focus-visible &']);
			addVariant('active', ['&:active']);
		}),
	],
};
