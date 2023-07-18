<script>
	import { page } from '$app/stores';

	import { signOut } from '$lib/auth/session';
	import { userStore } from '$lib/auth/store';

	import Button from './Button.svelte';
	import SearchBox from './SearchBox.svelte';

	const user = userStore();
</script>

<div class="h-[3.25rem]" />

<header
	class="fixed left-0 right-0 top-0 z-20 flex h-[3.25rem] items-center justify-between gap-4 bg-gradient-to-b from-white/80 px-4 py-2"
>
	<a
		class="block cursor-pointer select-none whitespace-nowrap rounded border-b border-r border-black bg-[--logo-bg] px-3.5 py-1 font-extrabold text-white transition-[filter] duration-300 ease-out active:grayscale active:transition-none"
		href="/"
	>
		📸🐆🎶
	</a>

	<SearchBox />

	{#if $user}
		<Button href="/upload" class="whitespace-nowrap">
			<span class="mr-2 max-sm:hidden">Upload</span>📸
		</Button>
	{/if}

	<div>
		{#if $user}
			<Button intent="transparent" on:click={signOut}>
				<span class="max-sm:hidden">Sign out</span>
				<span class="sm:hidden">🚪</span>
			</Button>
		{:else if $page.url.pathname !== '/login'}
			<Button href="/login">Sign in</Button>
		{/if}
	</div>
</header>
