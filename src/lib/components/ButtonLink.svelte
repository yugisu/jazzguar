<script lang="ts">
	export let href: string;
</script>

<a
	{href}
	class="cursor-pointer select-none rounded-sm bg-orange-500 px-3 py-1 font-bold text-white hover:bg-orange-400 active:bg-orange-600"
>
	<slot />
</a>
