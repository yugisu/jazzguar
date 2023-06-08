export const stringToHue = (str: string) => {
	const bytes = Array.from(str.toString().toLowerCase());

	const sum = bytes.reduce((a, b) => a + b.charCodeAt(0), 0);
	const product = bytes.reduce((a, b) => a * b.charCodeAt(0), 1);

	return Math.abs(sum - product) % 360;
};

export const stringToHsl = (str: string, saturation = 100, lightness = 75) => {
	return `hsl(${stringToHue(str)}, ${saturation}%, ${lightness}%)`;
};
