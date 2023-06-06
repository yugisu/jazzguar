<script>
	import Button from '$lib/components/Button.svelte';
</script>

<form class="flex w-full max-w-3xl flex-col items-start gap-4" on:submit|preventDefault={() => console.log('yay')}>
	<h1 class="text-2xl">Upload a photo</h1>

	<input name="file" type="file" />

	<Button type="submit">Submit</Button>
</form>
