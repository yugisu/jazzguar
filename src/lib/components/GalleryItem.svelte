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
		<div
			class="z-10 h-9 overflow-hidden rounded-bl rounded-br opacity-60 group-hover:overflow-visible group-hover:opacity-100"
		>
			<div class="flex flex-wrap gap-1 rounded-bl rounded-br bg-white p-2 shadow-sm">
				{#if relatedTags}
					{#each relatedTags as tag (tag)}
						<TagLabel text={tag} />
					{/each}

					{#if otherTags.length > 0}
						<p class="my-1.5 basis-full text-xs font-bold text-gray-700">Non-related tags:</p>
					{/if}
				{/if}

				{#each otherTags as tag (tag)}
					<TagLabel text={tag} />
				{/each}
			</div>
		</div>
	</div>
</a>
