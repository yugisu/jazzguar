<script>
	import { goto, invalidate } from '$app/navigation';
	import { savePhoto } from '$lib/photos';
	import Button from '$lib/components/Button.svelte';

	let submitting = false;
	let errorMessage = '';
</script>

<div class="px-4">
	<form
		class="flex w-full max-w-3xl flex-col gap-4"
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
		<h1 class="text-2xl">Upload a photo</h1>

		<fieldset class="flex flex-col gap-4" disabled={submitting}>
			<label>
				<p>File</p>
				<input name="file" type="file" />
			</label>

			<label>
				<p>Tags</p>
				<input name="tags" class="rounded-sm border border-gray-400" placeholder="Tags, delimited by '|'" />
			</label>

			<div class="flex gap-2">
				<a href="/">
					<Button>Cancel</Button>
				</a>
				<Button type="submit">Submit</Button>
			</div>

			{#if errorMessage}
				<p class="text-red-700">{errorMessage}</p>
			{/if}
		</fieldset>
	</form>
</div>
