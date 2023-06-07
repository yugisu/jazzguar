<script lang="ts">
	import { stringToHue } from '$lib/color';

	export let text: string;
</script>

<div class="rounded-sm px-1 py-0.5 text-xs font-medium" style:--hue={stringToHue(text)}>
	{text}
</div>

<style>
	div {
		color: hsl(var(--hue), 90%, 20%);
		background-color: hsl(var(--hue), 80%, 80%);
	}
</style>
