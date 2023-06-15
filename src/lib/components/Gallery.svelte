<script lang="ts">
	import type { Photo } from '$lib/db-schema';

	import TagLabel from './TagLabel.svelte';

	export let photos: Photo[];
</script>

<div class="grid grid-cols-[repeat(auto-fit,minmax(15rem,20rem))] gap-4">
	{#each photos as photo (photo.id)}
		<div class="flex max-w-xs flex-col rounded-sm bg-white shadow-sm">
			<img src={photo.srcOptimized || photo.src} alt={photo.name} class="aspect-square max-w-full object-contain" />

			<div class="border-t border-t-gray-100 p-2">
				<p class="text-xs text-gray-400">{photo.id}</p>

				<p>{photo.name}</p>
			</div>

			<div class="flex flex-wrap gap-1 border-t border-t-gray-100 p-2 opacity-60 hover:opacity-100">
				{#each photo.tags as tag (tag)}
					<TagLabel text={tag} />
				{/each}
			</div>
		</div>
	{/each}
</div>
