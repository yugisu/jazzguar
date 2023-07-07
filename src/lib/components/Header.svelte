<script>
	import { page } from '$app/stores';
	import { signOut, userStore } from '$lib/auth';

	import Button from './Button.svelte';

	const user = userStore();
</script>

<header class="flex bg-white px-4 py-2">
	<a href="/">
		<span class="select-none font-extrabold">jazzguar 📸🐆🎶</span>
	</a>

	<div class="ml-auto">
		{#if $user}
			<span>Hello, {$user.displayName ?? $user.email}</span>
			<button on:click={signOut}>Sign out</button>
		{:else if $page.url.pathname !== '/login'}
			<Button href="/login">Sign in</Button>
		{/if}
	</div>
</header>
