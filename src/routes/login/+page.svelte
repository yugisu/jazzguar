<script>
	import { signInWithGoogle } from '$lib/auth';
	import Button from '$lib/components/Button.svelte';
</script>

<div class="flex h-full flex-col items-center justify-center">
	<h1 class="px-4 py-6 text-4xl font-black italic text-gray-800">Sign in to use jazzguar 📸🐆🎶</h1>

	<Button on:click={signInWithGoogle}>Sign in with Google</Button>
</div>
