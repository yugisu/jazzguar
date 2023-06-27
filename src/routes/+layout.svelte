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

<Header />
<main class="pb-20 pt-2">
	<slot />
</main>
