<script>
	import './global.css';

	import { onMount } from 'svelte';

	import { syncAuthCookie } from '$lib/auth';
	import Header from '$lib/components/Header.svelte';

	onMount(() => {
		const unsubscribe = syncAuthCookie();
		return () => unsubscribe();
	});
</script>

<svelte:head>
	<title>jazzguar 📸🐆🎶</title>
</svelte:head>

<Header />
<main class="h-full pb-20 pt-2">
	<slot />
</main>
