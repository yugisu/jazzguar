<script lang="ts">
	import type { Photo } from '$lib/db-schema';
	import { calculatePhotoRelevance, type PhotoRelevanceData } from '$lib/search';

	import TagLabel from './TagLabel.svelte';

	export let photos: Photo[];

	export let relevantTags: Record<string, number> = {};

	const rankedPhotos: PhotoRelevanceData[] =
		Object.keys(relevantTags).length === 0
			? photos.map((photo) => ({ photo }))
			: photos
					.map((photo) => calculatePhotoRelevance(photo, relevantTags))
					.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
</script>

<div class="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4">
	{#each rankedPhotos as { photo, rating, relatedTags } (photo.id)}
		<div class="group flex flex-col rounded bg-white shadow-sm">
			<img
				src={photo.srcOptimized || photo.src}
				alt={photo.name}
				class="aspect-square max-w-full rounded-tl rounded-tr object-contain"
			/>

			<div class="p-2">
				{#if rating !== undefined}
					<p class="text-xs text-gray-300">score: {rating.toFixed(2)}</p>
				{/if}
				<p class="text-xs text-gray-300">id: {photo.id}</p>

				<p>{photo.name}</p>
			</div>

			<div class="relative flex flex-wrap gap-1 border-t border-t-gray-100 p-2">
				{#if relatedTags}
					{@const otherTags = photo.tags.filter((tag) => !relatedTags?.includes(tag))}
					{#each relatedTags as tag (tag)}
						<div class="opacity-60 group-hover:opacity-100">
							<TagLabel text={tag} />
						</div>
					{/each}
					<div
						class="absolute left-0 top-[calc(100%-0.25rem)] z-10 hidden w-full rounded-bl rounded-br bg-white p-2 shadow-sm group-hover:block"
					>
						<p class="mb-1 text-xs font-bold text-gray-700">Other tags</p>
						<div class="flex flex-wrap gap-1">
							{#each otherTags as tag (tag)}
								<TagLabel text={tag} />
							{/each}
						</div>
					</div>
				{:else}
					{#each photo.tags as tag (tag)}
						<div class="opacity-60 group-hover:opacity-100">
							<TagLabel text={tag} />
						</div>
					{/each}
				{/if}
			</div>
		</div>
	{/each}
</div>
