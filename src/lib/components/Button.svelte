<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	export const button = cva('cursor-pointer select-none rounded border font-medium', {
		variants: {
			intent: {
				primary: ['border-transparent bg-gray-800 hover:bg-gray-700 active:bg-gray-600', 'text-white'],
				secondary: ['border-transparent bg-gray-300 hover:bg-gray-200 active:bg-gray-400', 'text-gray-700'],
			},
			size: {
				medium: 'px-[0.875rem] py-1',
			},
		},
		compoundVariants: [{ intent: 'primary', size: 'medium', class: 'primaryMedium' }],
	});

	interface $$Props extends HTMLButtonAttributes, VariantProps<typeof button> {}

	export let intent: $$Props['intent'] = 'primary';
	export let size: $$Props['size'] = 'medium';
</script>

<button {...$$props} class={twMerge(button({ intent, size, class: $$props.class }))}>
	<slot />
</button>
