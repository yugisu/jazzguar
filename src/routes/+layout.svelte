<script>
	import './global.css';

	import Header from '$lib/components/Header.svelte';
</script>

<Header />
<main class="px-4 py-2">
	<slot />
</main>
