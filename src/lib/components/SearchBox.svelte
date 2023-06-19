<script lang="ts">
	import Button from './Button.svelte';

	export let initialQuery = '';
</script>

<form class="flex max-w-xl flex-1 shadow-sm" action="/search">
	<input
		type="text"
		name="q"
		placeholder="Search your photos..."
		class="w-full rounded-l border border-r-0 border-gray-300 px-2 py-1"
		value={initialQuery}
	/>
	<Button class="rounded-none rounded-r" type="submit">🔎</Button>
</form>
