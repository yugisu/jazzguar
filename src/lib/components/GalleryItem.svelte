<script lang="ts">
	import type { Photo } from '$lib/db/types';

	import TagLabel from './TagLabel.svelte';

	export let photo: Photo;
	export let rating: number | undefined;
	export let relatedTags: string[] | undefined;
</script>

<a class="group flex flex-col rounded bg-white hocus:z-10" href={photo.src}>
	<div class="relative">
		<img
			src={photo.srcOptimized || photo.src}
			alt={photo.name}
			class="aspect-[7/8] max-w-full rounded object-cover"
			style:background-color={photo.dominantColor}
		/>

		<div class="absolute inset-0 flex flex-col justify-between rounded bg-gradient-to-b from-black/70 to-20% p-2">
			<div class="height-auto flex items-center">
				<p class="flex-1 text-sm font-medium text-white" title={photo.id}>{photo.name}</p>
			</div>

			{#if relatedTags}
				<div>
					<!-- TODO: Remove or redesign this div. Currently, it exists for dev purposes. -->
					<p class="text-xs text-white">
						{#if rating !== undefined}
							<span>Search confidence: {rating.toFixed(2)}.</span>
						{/if}

						<span>Related Tags:</span>
					</p>

					<div class="flex flex-wrap gap-1">
						{#each relatedTags as tag (tag)}
							<TagLabel text={tag} />
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</a>
