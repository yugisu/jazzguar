// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { ComponentType } from 'svelte';

import type { UserProfile } from '$lib/auth/types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			userProfile: UserProfile | null;
		}
		interface PageData {
			/**
			 * User profile data available on server. Populated in server hooks.
			 */
			userProfile: UserProfile | null;
			/**
			 * Component to be rendered when the user navigates to an auth-protected route.
			 *
			 * If it is not specified, the route is considered as unprotected, and renders for all users regardless of their auth state.
			 */
			unauthenticatedView?: ComponentType;
		}
		// interface Platform {}
	}
}

export {};
