<script lang="ts">
	import { onMount } from 'svelte';

	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	import TagLabel from '$lib/components/TagLabel.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	const { photo } = data;

	let shouldRenderFullImage = false;
	onMount(() => {
		setTimeout(() => (shouldRenderFullImage = true), 0);
	});

	$: !photo && browser && goto('/');
</script>

{#if photo}
	<div class="flex flex-col items-center p-4">
		<div class="flex flex-col gap-4">
			<p class="font-medium">{photo.name}</p>

			<div class="relative">
				<img
					class="max-h-[85vh] w-full max-w-5xl bg-zinc-600"
					style:aspect-ratio={photo.aspectRatio}
					style:background-color={photo.dominantColor}
					src={photo.srcOptimized ?? photo.src}
					alt="Photo ${photo.name}"
				/>
				{#if shouldRenderFullImage && photo.srcOptimized}
					<img
						src={photo.src}
						class="absolute inset-0 z-10 w-full"
						style:aspect-ratio={photo.aspectRatio}
						aria-hidden="true"
						alt=""
					/>
				{/if}
			</div>

			<div class="flex flex-wrap gap-2">
				{#each photo.tags as tag (tag)}
					<TagLabel text={tag} />
				{/each}
			</div>
		</div>
	</div>
{:else}
	Photo not found!
{/if}
