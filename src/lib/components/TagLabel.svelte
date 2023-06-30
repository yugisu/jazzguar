<script lang="ts">
	import { stringToHue } from '$lib/color';

	export let text: string;
</script>

<div class="rounded-sm px-1 py-0.5 text-xs font-medium" style:--hue={stringToHue(text)}>
	{text}
</div>

<style lang="postcss">
	div {
		color: hsl(var(--hue), 100%, 25%);
		background-color: theme('colors.gray.100');
	}
</style>
