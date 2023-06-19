<script>
	import { page } from '$app/stores';
	import Gallery from '$lib/components/Gallery.svelte';
	import SearchBox from '$lib/components/SearchBox.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	$: initialQuery = $page.url.searchParams.get('q') ?? '';
</script>

<h1 class="px-4 py-6 text-4xl font-black italic text-gray-800">Search photos</h1>

<div class="flex justify-between gap-4 px-4 py-4 max-sm:flex-col">
	<SearchBox {initialQuery} />
</div>

<div class="p-4">
	{#await data.streamed.searchResults}
		Loading...
	{:then { photos, relevantTags }}
		{#if photos.length > 0}
			<Gallery {photos} {relevantTags} />
		{:else}
			No photos found.
		{/if}
	{:catch error}
		<p>Error while fetching search results. Please, try refreshing the page.</p>
		<pre class="mt-2">{error instanceof Error ? error.message : JSON.stringify(error, null, 2)}</pre>
	{/await}
</div>
