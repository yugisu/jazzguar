<script>
	import './global.css';

	import { page } from '$app/stores';
	import { userStore } from '$lib/auth/store';
	import Header from '$lib/components/Header.svelte';

	const user = userStore();
</script>

<svelte:head>
	<title>jazzguar 📸🐆🎶</title>
</svelte:head>

<Header />
<main class="h-full pb-20 pt-2">
	{#if $page.data.unauthenticatedView}
		{#if $user === undefined}
			<div>Loading...</div>
		{:else if $user}
			<slot />
		{:else}
			<svelte:component this={$page.data.unauthenticatedView} />
		{/if}
	{:else}
		<slot />
	{/if}
</main>
