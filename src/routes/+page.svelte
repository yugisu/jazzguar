<script>
	import Button from '$lib/components/Button.svelte';
	import TagLabel from '$lib/components/TagLabel.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="px-4 py-4">
	<a href="/upload">
		<Button>Upload a photo</Button>
	</a>
</div>

<div class="grid grid-cols-[repeat(auto-fit,minmax(15rem,20rem))] gap-4 bg-gray-50 p-4">
	{#each data.photosSnap.docs as photoSnap (photoSnap.id)}
		<div class="flex max-w-xs flex-col rounded-sm bg-white shadow-sm">
			<img
				src={photoSnap.data().srcOptimized || photoSnap.data().src}
				alt={photoSnap.data().name}
				class="aspect-square max-w-full object-contain"
			/>

			<div class="border-t border-t-gray-100 p-2">
				<p>{photoSnap.data().name}</p>
			</div>

			<div class="flex flex-wrap gap-1 border-t border-t-gray-100 p-2 opacity-60 hover:opacity-100">
				{#each photoSnap.data().tags as tag (tag)}
					<TagLabel text={tag} />
				{/each}
			</div>
		</div>
	{/each}
</div>
