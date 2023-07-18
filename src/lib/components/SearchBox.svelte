<script lang="ts">
	import { page } from '$app/stores';

	import Button from './Button.svelte';

	$: initialQuery = $page.url.searchParams.get('q') ?? '';
</script>

<form class="flex flex-1 rounded border border-transparent bg-gray-200" action="/search">
	<input
		type="text"
		name="q"
		placeholder="Search"
		class="w-full rounded-l bg-transparent px-3.5 py-1 placeholder:text-gray-500 max-sm:px-2"
		value={initialQuery}
		autocomplete="off"
	/>
	<div>
		<div class="w-[1px] bg-gray-200 max-sm:hidden" />
		<Button intent="transparent" type="submit" class="rounded-none rounded-r max-sm:hidden">Find</Button>
	</div>
</form>
