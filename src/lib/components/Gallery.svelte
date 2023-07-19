<script lang="ts">
	import { page } from '$app/stores';

	import type { Photo } from '$lib/db/types';
	import { calculatePhotoRelevance, type PhotoRelevanceData } from '$lib/photos';

	import GalleryItem from './GalleryItem.svelte';
	import PhotoDetailsModal from './PhotoDetailsModal.svelte';

	export let photos: Photo[];
	export let relevantTags: Record<string, number> | undefined = undefined;

	$: rankedPhotos = (
		relevantTags
			? photos
					.map((photo) => calculatePhotoRelevance(photo, relevantTags!))
					.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
			: photos.map((photo) => ({ photo }))
	) as PhotoRelevanceData[];

	let focusedPhoto: Photo | undefined;
	let initialUrl = $page.url;
	let restoreFocusTo: HTMLElement | undefined;

	/**
	 * Opens the photo modal within the context of the current page and modifies the url without actually navigating to the photo page.
	 * If the user refreshes the page while the modal is opened, they are shown the actual photo page.
	 */
	const openPhotoModalHandler = (photo: Photo) => (e: MouseEvent) => {
		if (e.metaKey || e.ctrlKey) return;

		e.preventDefault();

		// Store the initial url and potential focusable target (if opened the modal via keyboard)
		initialUrl = $page.url;
		if (e.detail === 0) {
			restoreFocusTo = e.currentTarget as HTMLElement;
		}

		focusedPhoto = photo;
		window.history.pushState(null, '', (e.currentTarget as HTMLAnchorElement).href);
	};

	const closePhotoModal = () => {
		restoreFocusTo?.focus();
		restoreFocusTo = undefined;

		focusedPhoto = undefined;
		window.history.pushState(null, '', initialUrl.toString());
	};
</script>

{#if focusedPhoto}
	<PhotoDetailsModal photo={focusedPhoto} on:close={closePhotoModal} />
{/if}

<div class="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4">
	{#each rankedPhotos as { photo, rating, relatedTags } (photo.id)}
		<a href="/jazz/{photo.id}" on:click={openPhotoModalHandler(photo)}>
			<GalleryItem {photo} {rating} {relatedTags} />
		</a>
	{/each}
</div>
