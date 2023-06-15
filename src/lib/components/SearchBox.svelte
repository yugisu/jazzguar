<script lang="ts">
	import Button from './Button.svelte';

	export let initialQuery = '';
</script>

<form class="flex max-w-xl flex-1" action="/search">
	<input
		type="text"
		name="q"
		placeholder="Search"
		class="w-full rounded-sm border border-gray-400 p-1"
		value={initialQuery}
	/>
	<Button type="submit">🔎</Button>
</form>
