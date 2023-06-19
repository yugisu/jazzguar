export const stringToHue = (str: string) => {
	let hash = 0;
	if (str.length === 0) return hash;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
		hash = hash & hash;
	}

	const bytes = Array.from(str.toString().toLowerCase());

	const sum = bytes.reduce((a, b) => a + b.charCodeAt(0), 0);
	const product = bytes.reduce((a, b) => a * b.charCodeAt(0), 1);

	return (hash + Math.abs(sum - product)) % 360;
};

export const stringToHsl = (str: string, saturation = 100, lightness = 75) => {
	return `hsl(${stringToHue(str)}, ${saturation}%, ${lightness}%)`;
};
