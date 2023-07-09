<script>
	import Gallery from '$lib/components/Gallery.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

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
