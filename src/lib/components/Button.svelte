<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	export const button = cva(
		'block cursor-pointer select-none rounded border font-medium disabled:cursor-not-allowed disabled:opacity-80',
		{
			variants: {
				intent: {
					primary: ['border-transparent bg-gray-800 hocus:bg-gray-700 active:bg-gray-600', 'text-white'],
					secondary: ['border-transparent bg-gray-300 hocus:bg-gray-200 active:bg-gray-400', 'text-gray-700'],
					transparent: ['border-transparent hocus:bg-gray-100 active:bg-gray-200'],
				},
				size: {
					medium: 'px-3.5 py-1',
				},
			},
		},
	);

	interface $$Props extends HTMLButtonAttributes, VariantProps<typeof button> {
		href?: string;
	}

	export let intent: $$Props['intent'] = 'primary';
	export let size: $$Props['size'] = 'medium';

	export let href: $$Props['href'] = undefined;
</script>

{#if href}
	<a {href} on:click {...$$props} class={twMerge(button({ intent, size, class: $$props.class }))}>
		<slot />
	</a>
{:else}
	<button on:click type="button" {...$$props} class={twMerge(button({ intent, size, class: $$props.class }))}>
		<slot />
	</button>
{/if}
