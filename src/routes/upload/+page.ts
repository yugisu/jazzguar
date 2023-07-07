import DefaultUnauthenticatedView from '$lib/components/DefaultUnauthenticatedView.svelte';

export const load = async () => {
	return {
		unauthenticatedView: DefaultUnauthenticatedView,
	};
};
