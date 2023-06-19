<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import { savePhoto } from '$lib/photos';

	let files: FileList | undefined;
	$: image = files?.[0];

	let submitting = false;
	let errorMessage = '';
</script>

<h1 class="px-4 py-6 text-4xl font-black italic text-gray-800">Upload a photo</h1>

<form
	class="p-4"
	on:submit|preventDefault={async (e) => {
		submitting = true;
		errorMessage = '';

		const formData = new FormData(e.currentTarget);

		const file = formData.get('file');
		const tagsString = formData.get('tags');

		try {
			if (!(file instanceof File) || file.size === 0) {
				throw new Error('Please, specify the file you want to upload');
			}

			const tags =
				typeof tagsString === 'string'
					? tagsString
							.split('|')
							.map((str) => str.trim())
							.filter(Boolean)
					: [];

			await savePhoto({ file, tags });

			await invalidate('/');
			goto('/');
		} catch (error) {
			if (error instanceof Error) {
				errorMessage = error.message;
			}
			console.error(error);
		} finally {
			submitting = false;
		}
	}}
>
	<fieldset class="flex max-w-sm flex-col gap-4" disabled={submitting}>
		<label>
			<p class="mb-2 w-auto text-sm font-bold">Image</p>

			<div class="image-container cursor-pointer">
				{#if image}
					<img src={URL.createObjectURL(image)} class="object-contain" alt="Preview of image '{image.name}'" />
				{:else}
					<div class="flex items-center justify-center p-2">
						<p class="text-center text-2xl font-bold text-gray-300">Click to pick a photo</p>
					</div>
				{/if}

				<p class="text-medium mt-3 text-center text-sm font-medium italic">
					{#if image}
						{image.name}
					{:else}
						&nbsp;
					{/if}
				</p>
			</div>

			<input class="hidden" name="file" type="file" bind:files accept="image/png, image/jpeg, image/webp" />
		</label>

		<label>
			<p class="mb-2 text-sm font-bold">Tags</p>
			<input
				name="tags"
				class="w-full rounded border border-gray-300 px-2 py-1"
				placeholder="Your tags, delimited by |"
			/>
		</label>

		<div class="flex gap-2">
			<a href="/">
				<Button intent="secondary">Cancel</Button>
			</a>
			<Button type="submit">Upload&nbsp;&nbsp;🚀</Button>
		</div>

		{#if errorMessage}
			<p class="text-red-700">{errorMessage}</p>
		{/if}
	</fieldset>
</form>

<style lang="postcss">
	.image-container > :first-child {
		@apply aspect-square w-full max-w-sm rounded border border-gray-300 bg-white;
	}
</style>
