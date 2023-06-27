<script>
	import { signInWithGoogle, signOut, user } from '$lib/auth';

	export let data;
</script>

<button on:click={signInWithGoogle}>Log in with Google</button>
<button on:click={signOut}>Sign out</button>

<div>
	{JSON.stringify($user ?? data.user)}
</div>
