<script>
	import Button from '$lib/components/Button.svelte';
	import Gallery from '$lib/components/Gallery.svelte';
	import SearchBox from '$lib/components/SearchBox.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<h1 class="px-4 py-6 text-4xl font-black italic text-gray-800">Photo gallery</h1>

<div class="flex justify-between gap-4 px-4 py-4 max-sm:flex-col">
	<SearchBox />

	<div>
		<a href="/upload">
			<Button>Upload a photo</Button>
		</a>
	</div>
</div>

<div class="p-4">
	<Gallery photos={data.photosSnap.docs.map((snap) => snap.data())} />
</div>
