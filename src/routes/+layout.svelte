<script>
	import './global.css';

	import { onMount } from 'svelte';

	import { page } from '$app/stores';
	import { syncAuthCookie } from '$lib/auth/session';
	import { userStore } from '$lib/auth/store';
	import Header from '$lib/components/Header.svelte';

	onMount(() => {
		const unsubscribe = syncAuthCookie();
		return () => unsubscribe();
	});

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
