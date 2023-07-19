<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import type { Photo } from '$lib/db/types';
	import { calculatePhotoRelevance, type PhotoRelevanceData } from '$lib/photos';

	import GalleryItem from './GalleryItem.svelte';
	import PhotoDetailsModal from './PhotoDetailsModal.svelte';

	export let photos: Photo[];
	export let relevantTags: Record<string, number> | undefined = undefined;

	const getLinkHref = (photo: Photo) => {
		const url = new URL($page.url.href);
		url.searchParams.set('show', photo.id);
		return url;
	};

	const closeModal = () => {
		const url = new URL($page.url.href);
		url.searchParams.delete('show');
		goto(url, { noScroll: true });
	};

	$: rankedPhotos = (
		relevantTags
			? photos
					.map((photo) => calculatePhotoRelevance(photo, relevantTags!))
					.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
			: photos.map((photo) => ({ photo }))
	) as PhotoRelevanceData[];

	$: focusedPhotoId = $page.url.searchParams.get('show');
	$: focusedPhoto = photos.find((photo) => photo.id === focusedPhotoId);

	$: focusedPhotoId && !focusedPhoto && browser && closeModal();
</script>

<!-- FIXME: Fix issue when the whole page is reloading when opening this modal on the search page -->
{#if focusedPhoto}
	<PhotoDetailsModal photo={focusedPhoto} on:close={closeModal} />
{/if}

<div class="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4">
	{#each rankedPhotos as { photo, rating, relatedTags } (photo.id)}
		<a href={getLinkHref(photo)}>
			<GalleryItem {photo} {rating} {relatedTags} />
		</a>
	{/each}
</div>
