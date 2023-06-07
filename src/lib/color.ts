export const stringToHue = (str: string) => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
		hash = hash & hash;
	}
	return hash % 360;
};

export const stringToHsl = (str: string, saturation = 100, lightness = 75) => {
	return `hsl(${stringToHue(str)}, ${saturation}%, ${lightness}%)`;
};
