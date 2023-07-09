<script>
	import Gallery from '$lib/components/Gallery.svelte';

	import { userStore } from '$lib/auth/store';

	export let data;

	const user = userStore();
</script>

{#if $user}
	<div class="p-4">
		<Gallery photos={data.userPhotos ?? []} />
	</div>
{:else}
	<h1 class="px-4 py-6 text-4xl font-black italic text-gray-800">Landing page</h1>
{/if}
