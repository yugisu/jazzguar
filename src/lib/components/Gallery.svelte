<script lang="ts">
	import type { Photo } from '$lib/db-schema';
	import { calculatePhotoRelevance, type PhotoRelevanceData } from '$lib/search';

	import TagLabel from './TagLabel.svelte';

	export let photos: Photo[];

	export let relevantTags: Record<string, number> = {};

	let rankedPhotos: PhotoRelevanceData[] =
		Object.keys(relevantTags).length === 0
			? photos.map((photo) => ({ photo }))
			: photos
					.map((photo) => calculatePhotoRelevance(photo, relevantTags))
					.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
</script>

<div class="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4">
	{#each rankedPhotos as { photo, rating, relatedTags } (photo.id)}
		<div class="flex flex-col rounded bg-white shadow-sm">
			<img
				src={photo.srcOptimized || photo.src}
				alt={photo.name}
				class="aspect-square max-w-full rounded-tl rounded-tr object-contain"
			/>

			<div class="p-2">
				{#if rating !== undefined}
					<p class="text-xs text-gray-400">{rating.toFixed(2)}</p>
				{/if}
				<p class="text-xs text-gray-400">{photo.id}</p>

				<p>{photo.name}</p>
			</div>

			<!-- TODO: Render only reason tags / manually added tags, show automated tags on hover -->
			<div class="flex flex-wrap gap-1 border-t border-t-gray-100 p-2 opacity-60 hover:opacity-100">
				{#each relatedTags ?? photo.tags as tag (tag)}
					<TagLabel text={tag} />
				{/each}
			</div>
		</div>
	{/each}
</div>
