<script lang="ts">
	import { createDialog } from '@melt-ui/svelte';
	import { ArrowLeft } from 'lucide-svelte';
	import { createEventDispatcher, onMount } from 'svelte';

	import { browser } from '$app/environment';

	import type { Photo } from '$lib/db/types';

	export let photo: Photo;

	interface $$Events {
		close: void;
	}
	const dispatch = createEventDispatcher<$$Events>();

	/** Render full image only after the modal has been opened; otherwise, the modal waits for the large image to render. */
	let shouldRenderFullImage = false;
	onMount(() => {
		setTimeout(() => (shouldRenderFullImage = true), 0);
	});

	const { portal, open, overlay, content, title, close } = createDialog({ preventScroll: browser });

	$open = true;
	$: !$open && dispatch('close');
</script>

{#if $open}
	<div use:portal>
		<div melt={$overlay} class="fixed inset-0 z-40 bg-black/80" />

		<div class="fixed inset-0 z-40 flex items-center justify-center p-4">
			<div
				melt={$content}
				class="relative flex flex-col bg-white p-0.5 shadow-lg"
				style:--dominantColor={photo.dominantColor}
			>
				<h2 melt={$title} class="sr-only">Photo "{photo.name}"</h2>

				<div class="relative">
					<img
						class="max-h-[85vh] w-full max-w-5xl bg-zinc-600"
						style:aspect-ratio={photo.aspectRatio}
						style:background-color={photo.dominantColor}
						src={photo.srcOptimized ?? photo.src}
						alt="Photo ${photo.name}"
					/>
					{#if shouldRenderFullImage && photo.srcOptimized}
						<img class="absolute inset-0 z-10 w-full" src={photo.src} aria-hidden="true" alt="" />
					{/if}
				</div>

				<div class="absolute -top-8 left-0 right-0 flex h-6 items-end justify-between gap-4">
					<button melt={$close} class="relative h-6 w-6 flex-shrink-0">
						<span class="sr-only">Close modal</span>
						<ArrowLeft class="h-full w-full text-white" />

						<div class="absolute -inset-3" />
					</button>

					<p class="pb-0.5 text-sm font-medium text-white">
						{photo.name}
					</p>

					<div class="w-6 flex-shrink-0" />
				</div>
			</div>
		</div>
	</div>
{/if}
