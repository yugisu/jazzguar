<script>
	import { page } from '$app/stores';
	import Gallery from '$lib/components/Gallery.svelte';
	import SearchBox from '$lib/components/SearchBox.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	$: initialQuery = $page.url.searchParams.get('q') ?? '';
</script>

<div class="flex justify-between gap-4 px-4 py-4 max-sm:flex-col">
	<SearchBox {initialQuery} />
</div>

<div class="p-4">
	{#await data.streamed.photos}
		Loading...
	{:then photos}
		{#if photos.length > 0}
			<Gallery {photos} />
		{:else}
			No photos found.
		{/if}
	{/await}
</div>
