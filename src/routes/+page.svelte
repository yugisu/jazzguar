<script>
	import Button from '$lib/components/Button.svelte';
	import Gallery from '$lib/components/Gallery.svelte';
	import SearchBox from '$lib/components/SearchBox.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<h1 class="px-4 py-6 text-4xl font-black italic text-gray-800">Photo gallery</h1>

<div class="flex gap-x-4 gap-y-4 px-4 py-4 max-sm:flex-col">
	<SearchBox />

	<div class="w-[1px] bg-gray-300 max-sm:hidden" />

	<div>
		<a href="/upload">
			<Button>Upload a photo&nbsp;&nbsp;📸</Button>
		</a>
	</div>
</div>

<div class="p-4">
	<Gallery photos={data.photosSnap.docs.map((snap) => snap.data())} />
</div>
