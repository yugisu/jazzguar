<script lang="ts">
	import Button from './Button.svelte';

	export let initialQuery = '';
</script>

<form class="flex max-w-xl flex-1" action="/search">
	<input
		type="text"
		name="q"
		placeholder="Search your photos..."
		class="w-full rounded-sm border border-gray-400 px-2 py-1"
		value={initialQuery}
	/>
	<Button type="submit">🔎</Button>
</form>
