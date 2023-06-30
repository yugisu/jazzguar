<script lang="ts">
	import type { Photo } from '$lib/db-schema';

	import TagLabel from './TagLabel.svelte';

	export let photo: Photo;
	export let rating: number | undefined;
	export let relatedTags: string[] | undefined;

	const otherTags = relatedTags ? photo.tags.filter((tag) => !relatedTags?.includes(tag)) : photo.tags;
</script>

<a class="group flex flex-col rounded bg-white shadow-sm" href={photo.src}>
	<img
		src={photo.srcOptimized || photo.src}
		alt={photo.name}
		class="aspect-square max-w-full rounded-tl rounded-tr object-cover"
	/>

	<div class="p-2">
		{#if rating !== undefined}
			<p class="text-xs text-gray-300">score: {rating.toFixed(2)}</p>
		{/if}

		<p title={photo.id}>{photo.name}</p>
	</div>

	<div class="relative border-t border-t-gray-100">
		<div class="h-9">
			<div
				class="absolute left-0 right-0 flex h-9 flex-wrap gap-1 overflow-hidden rounded-bl rounded-br bg-white p-2 group-hover:h-[auto] group-hover:shadow-sm"
			>
				{#if relatedTags}
					{#each relatedTags as tag (tag)}
						<div class="opacity-60 group-hover:opacity-100">
							<TagLabel text={tag} />
						</div>
					{/each}

					{#if otherTags.length > 0}
						<p class="my-1.5 basis-full text-xs font-bold text-gray-700">Non-related tags:</p>
					{/if}
				{/if}

				{#each otherTags as tag (tag)}
					<div class="opacity-60 group-hover:opacity-100">
						<TagLabel text={tag} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</a>
