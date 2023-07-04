// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { UserProfile } from '$lib/types/auth';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			userProfile: UserProfile | null;
		}
		interface PageData {
			userProfile: UserProfile;
		}
		// interface Platform {}
	}
}

export {};
