<script lang="ts">
	import type { Photo } from '$lib/db/types';
	import { calculatePhotoRelevance, type PhotoRelevanceData } from '$lib/photos';

	import GalleryItem from './GalleryItem.svelte';

	export let photos: Photo[];

	export let relevantTags: Record<string, number> | undefined = undefined;

	$: rankedPhotos = (
		relevantTags
			? photos
					.map((photo) => calculatePhotoRelevance(photo, relevantTags!))
					.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
			: photos.map((photo) => ({ photo }))
	) as PhotoRelevanceData[];
</script>

<div class="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4">
	{#each rankedPhotos as { photo, rating, relatedTags } (photo.id)}
		<GalleryItem {photo} {rating} {relatedTags} />
	{/each}
</div>
